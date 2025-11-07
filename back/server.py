# back/server.py
 # servidor principal (rotas e endpoints)

import os
import json
from http.server import SimpleHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from urllib.parse import unquote
from pathlib import Path

# imports dos módulos locais
from db.connection import get_connection
from db import filmes as filmes_db
from cors import add_cors_headers

DATA_DIR = Path(__file__).resolve().parent / "data"
PENDENTES_FILE = DATA_DIR / "pendentes.json"

# garante que o data/ e o arquivo existam
DATA_DIR.mkdir(parents=True, exist_ok=True)
if not PENDENTES_FILE.exists():
    PENDENTES_FILE.write_text("[]", encoding="utf-8")


def read_pendentes():
    with open(PENDENTES_FILE, encoding="utf-8") as f:
        try:
            return json.load(f)
        except Exception:
            return []

def write_pendentes(lst):
    with open(PENDENTES_FILE, "w", encoding="utf-8") as f:
        json.dump(lst, f, ensure_ascii=False, indent=2)


class APIHandler(SimpleHTTPRequestHandler):
    # Serve somente arquivos estáticos da pasta pai - mas nosso objetivo é API JSON
    def _set_json_response(self, code=200):
        self.send_response(code)
        add_cors_headers(self)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()

    def _set_text_response(self, code=200):
        self.send_response(code)
        add_cors_headers(self)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()

    # Preflight (CORS)
    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        qs = parse_qs(parsed.query)

        # GET /api/filmes
        if path == "/api/filmes":
            try:
                filmes = filmes_db.list_filmes()
                self._set_json_response(200)
                self.wfile.write(json.dumps({"status": "ok", "data": filmes}, default=str).encode("utf-8"))
            except Exception as e:
                self._set_json_response(500)
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        # GET /api/filme?id=...
        if path == "/api/filme":
            id_str = qs.get("id", [None])[0]
            if not id_str:
                self._set_json_response(400)
                self.wfile.write(json.dumps({"status": "error", "message": "Parâmetro id é obrigatório"}).encode("utf-8"))
                return
            try:
                id_filme = int(id_str)
                filme = filmes_db.get_filme_by_id(id_filme)
                if not filme:
                    self._set_json_response(404)
                    self.wfile.write(json.dumps({"status": "error", "message": "Filme não encontrado"}).encode("utf-8"))
                else:
                    self._set_json_response(200)
                    self.wfile.write(json.dumps({"status": "ok", "data": filme}, default=str).encode("utf-8"))
            except ValueError:
                self._set_json_response(400)
                self.wfile.write(json.dumps({"status": "error", "message": "id inválido"}).encode("utf-8"))
            except Exception as e:
                self._set_json_response(500)
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        # GET /api/pendentes  (admin)
        if path == "/api/pendentes":
            role = self.headers.get("X-User-Role", "")
            if role != "admin":
                self._set_json_response(403)
                self.wfile.write(json.dumps({"status": "error", "message": "Admin privileges required (X-User-Role header)"}).encode("utf-8"))
                return
            pend = read_pendentes()
            self._set_json_response(200)
            self.wfile.write(json.dumps({"status": "ok", "data": pend}, ensure_ascii=False).encode("utf-8"))
            return

        return super().do_GET()

    def _read_json_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if length == 0:
            return {}
        raw = self.rfile.read(length).decode("utf-8")
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            # tentar parse de form-url-encoded (caso venham de formulários)
            parts = parse_qs(raw)
            # simplifica: pega primeiro valor de cada key
            return {k: v[0] if isinstance(v, list) else v for k, v in parts.items()}

    # POST endpoints
    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # Usuário solicita adicionar um novo filme (vai para pendentes.json)
        if path == "/api/solicitar_adicao":
            body = self._read_json_body()
            # espera um objeto com campos do filme (titulo, avaliacao, tempo_duracao, ano, descricao, poster, generos, atores, produtoras, diretores)
            # validação mínima:
            titulo = body.get("titulo") or body.get("title")
            if not titulo:
                self._set_json_response(400)
                self.wfile.write(json.dumps({"status": "error", "message": "Campo 'titulo' obrigatório"}).encode("utf-8"))
                return
            pend = read_pendentes()
            new_id = (max([p.get("id", 0) for p in pend]) + 1) if pend else 1
            item = {
                "id": new_id,
                "type": "add",
                "status": "pending",
                "payload": body
            }
            pend.append(item)
            write_pendentes(pend)
            self._set_json_response(201)
            self.wfile.write(json.dumps({"status": "ok", "message": "Solicitação de adição criada", "data": item}, ensure_ascii=False).encode("utf-8"))
            return

        # Usuário solicita edição de um filme existente
        if path == "/api/solicitar_edicao":
            body = self._read_json_body()
            target_id = body.get("id_filme") or body.get("id") or body.get("target_id")
            if not target_id:
                self._set_json_response(400)
                self.wfile.write(json.dumps({"status": "error", "message": "Campo 'id_filme' (target id) obrigatório"}).encode("utf-8"))
                return
            try:
                target_id = int(target_id)
            except ValueError:
                self._set_json_response(400)
                self.wfile.write(json.dumps({"status": "error", "message": "id_filme inválido"}).encode("utf-8"))
                return
            # checar se filme existe (opcional)
            filme = filmes_db.get_filme_by_id(target_id)
            if not filme:
                self._set_json_response(404)
                self.wfile.write(json.dumps({"status": "error", "message": "Filme alvo não encontrado"}).encode("utf-8"))
                return
            pend = read_pendentes()
            new_id = (max([p.get("id", 0) for p in pend]) + 1) if pend else 1
            item = {
                "id": new_id,
                "type": "edit",
                "status": "pending",
                "target_id": target_id,
                "payload": body
            }
            pend.append(item)
            write_pendentes(pend)
            self._set_json_response(201)
            self.wfile.write(json.dumps({"status": "ok", "message": "Solicitação de edição criada", "data": item}, ensure_ascii=False).encode("utf-8"))
            return

        # Admin aprova uma solicitação: body { "id": <pend_id> }
        if path == "/api/aprovar":
            role = self.headers.get("X-User-Role", "")
            if role != "admin":
                self._set_json_response(403)
                self.wfile.write(json.dumps({"status": "error", "message": "Admin privileges required (X-User-Role header)"}).encode("utf-8"))
                return
            body = self._read_json_body()
            pend_id = body.get("id")
            if pend_id is None:
                self._set_json_response(400)
                self.wfile.write(json.dumps({"status": "error", "message": "Campo 'id' da pendência é obrigatório"}).encode("utf-8"))
                return
            pend = read_pendentes()
            target = None
            for p in pend:
                if p.get("id") == pend_id:
                    target = p
                    break
            if not target:
                self._set_json_response(404)
                self.wfile.write(json.dumps({"status": "error", "message": "Pendência não encontrada"}).encode("utf-8"))
                return

            # processa: se type == add => inserir; se edit => atualizar
            try:
                if target.get("type") == "add":
                    payload = target.get("payload", {})
                    # insere dados básicos na tabela Filmes
                    new_id = filmes_db.insert_filme_basic(payload)
                    # vincula atores/generos/produtoras/diretores quando presente
                    filmes_db.link_relations_for_filme(new_id, payload)
                    # remove pendência
                    pend = [p for p in pend if p.get("id") != pend_id]
                    write_pendentes(pend)
                    self._set_json_response(200)
                    self.wfile.write(json.dumps({"status": "ok", "message": "Adição aprovada e filme inserido", "id_filme": new_id}, ensure_ascii=False).encode("utf-8"))
                    return
                elif target.get("type") == "edit":
                    payload = target.get("payload", {})
                    target_id = target.get("target_id")
                    updated = filmes_db.update_filme_basic(target_id, payload)
                    # sempre tenta linkar relações (p.ex. novos atores/generos)
                    filmes_db.link_relations_for_filme(target_id, payload)
                    # remove pendência
                    pend = [p for p in pend if p.get("id") != pend_id]
                    write_pendentes(pend)
                    if updated:
                        self._set_json_response(200)
                        self.wfile.write(json.dumps({"status": "ok", "message": "Edição aprovada e filme atualizado", "id_filme": target_id}, ensure_ascii=False).encode("utf-8"))
                    else:
                        # caso update não atualize (por ex. id não existe) retornamos 404
                        self._set_json_response(404)
                        self.wfile.write(json.dumps({"status": "error", "message": "Filme alvo não encontrado (update falhou)"}).encode("utf-8"))
                    return
                else:
                    self._set_json_response(400)
                    self.wfile.write(json.dumps({"status": "error", "message": "Tipo de pendência desconhecido"}).encode("utf-8"))
                    return
            except Exception as e:
                self._set_json_response(500)
                self.wfile.write(json.dumps({"status": "error", "message": f"Erro ao processar: {str(e)}"}).encode("utf-8"))
                return

        # Admin recusa uma solicitação: body { "id": <pend_id> }
        if path == "/api/recusar":
            role = self.headers.get("X-User-Role", "")
            if role != "admin":
                self._set_json_response(403)
                self.wfile.write(json.dumps({"status": "error", "message": "Admin privileges required (X-User-Role header)"}).encode("utf-8"))
                return
            body = self._read_json_body()
            pend_id = body.get("id")
            if pend_id is None:
                self._set_json_response(400)
                self.wfile.write(json.dumps({"status": "error", "message": "Campo 'id' da pendência é obrigatório"}).encode("utf-8"))
                return
            pend = read_pendentes()
            if not any(p.get("id") == pend_id for p in pend):
                self._set_json_response(404)
                self.wfile.write(json.dumps({"status": "error", "message": "Pendência não encontrada"}).encode("utf-8"))
                return
            pend = [p for p in pend if p.get("id") != pend_id]
            write_pendentes(pend)
            self._set_json_response(200)
            self.wfile.write(json.dumps({"status": "ok", "message": "Pendência recusada e removida"}).encode("utf-8"))
            return

        # Se não for nenhuma rota acima, fallback
        return super().do_POST()


def run(server_class=HTTPServer, handler_class=APIHandler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("Shutting down server")
        httpd.server_close()

if __name__ == "__main__":
    run()
