# funções de CRUD no banco

# Funções de acesso ao banco (listar, buscar, inserir, atualizar).
from typing import List, Dict, Optional
from .connection import get_connection
from mysql.connector import Error

def list_filmes() -> List[Dict]:
    """
    Retorna lista de filmes com alguns campos agregados (atores, diretores, generos...).
    """
    sql = """
    SELECT
        f.id_filme,
        f.titulo,
        f.avaliacao,
        f.tempo_duracao,
        f.ano,
        f.descricao,
        f.poster,
        GROUP_CONCAT(DISTINCT CONCAT(a.nome, ' ', a.sobrenome) SEPARATOR ', ') AS atores,
        GROUP_CONCAT(DISTINCT CONCAT(d.nome, ' ', d.sobrenome) SEPARATOR ', ') AS diretores,
        GROUP_CONCAT(DISTINCT p.nome SEPARATOR ', ') AS produtoras,
        GROUP_CONCAT(DISTINCT g.nome SEPARATOR ', ') AS generos
    FROM Filme f
    LEFT JOIN Ator_Filme af ON f.id_filme = af.id_filme
    LEFT JOIN Ator a ON af.id_ator = a.id_ator
    LEFT JOIN Diretor_Filme df ON f.id_filme = df.id_filme
    LEFT JOIN Diretor d ON df.id_diretor = d.id_diretor
    LEFT JOIN Produtora_Filme pf ON f.id_filme = pf.id_filme
    LEFT JOIN Produtora p ON pf.id_produtora = p.id_produtora
    LEFT JOIN Genero_Filme gf ON f.id_filme = gf.id_filme
    LEFT JOIN Genero g ON gf.id_genero = g.id_genero
    GROUP BY f.id_filme
    ORDER BY f.titulo;
    """
    conn = get_connection()
    cur = conn.cursor(dictionary=True)
    try:
        cur.execute(sql)
        rows = cur.fetchall()
        return rows
    finally:
        cur.close()
        conn.close()

def get_filme_by_id(id_filme: int) -> Optional[Dict]:
    sql = """
    SELECT
        f.id_filme,
        f.titulo,
        f.avaliacao,
        f.tempo_duracao,
        f.ano,
        f.descricao,
        f.poster,
        GROUP_CONCAT(DISTINCT CONCAT(a.nome, ' ', a.sobrenome) SEPARATOR ', ') AS atores,
        GROUP_CONCAT(DISTINCT CONCAT(d.nome, ' ', d.sobrenome) SEPARATOR ', ') AS diretores,
        GROUP_CONCAT(DISTINCT p.nome SEPARATOR ', ') AS produtoras,
        GROUP_CONCAT(DISTINCT g.nome SEPARATOR ', ') AS generos
    FROM Filme f
    LEFT JOIN Ator_Filme af ON f.id_filme = af.id_filme
    LEFT JOIN Ator a ON af.id_ator = a.id_ator
    LEFT JOIN Diretor_Filme df ON f.id_filme = df.id_filme
    LEFT JOIN Diretor d ON df.id_diretor = d.id_diretor
    LEFT JOIN Produtora_Filme pf ON f.id_filme = pf.id_filme
    LEFT JOIN Produtora p ON pf.id_produtora = p.id_produtora
    LEFT JOIN Genero_Filme gf ON f.id_filme = gf.id_filme
    LEFT JOIN Genero g ON gf.id_genero = g.id_genero
    WHERE f.id_filme = %s
    GROUP BY f.id_filme;
    """
    conn = get_connection()
    cur = conn.cursor(dictionary=True)
    try:
        cur.execute(sql, (id_filme,))
        row = cur.fetchone()
        return row
    finally:
        cur.close()
        conn.close()

# Helper para inserir/recuperar entidade simples (Produtora, Ator, Diretor, Genero)
def _get_or_create_produtora(conn, nome: str) -> int:
    cur = conn.cursor()
    try:
        cur.execute("SELECT id_produtora FROM Produtora WHERE nome = %s", (nome,))
        r = cur.fetchone()
        if r:
            return r[0]
        cur.execute("INSERT INTO Produtora (nome) VALUES (%s)", (nome,))
        conn.commit()
        return cur.lastrowid
    finally:
        cur.close()

def _get_or_create_genero(conn, nome: str) -> int:
    cur = conn.cursor()
    try:
        cur.execute("SELECT id_genero FROM Genero WHERE nome = %s", (nome,))
        r = cur.fetchone()
        if r:
            return r[0]
        cur.execute("INSERT INTO Genero (nome) VALUES (%s)", (nome,))
        conn.commit()
        return cur.lastrowid
    finally:
        cur.close()

def _get_or_create_ator(conn, full_name: str) -> int:
    # Splita nome em nome/sobrenome (separador: último espaço)
    parts = full_name.strip().rsplit(" ", 1)
    if len(parts) == 1:
        nome = parts[0]
        sobrenome = ""
    else:
        nome, sobrenome = parts
    cur = conn.cursor()
    try:
        cur.execute("SELECT id_ator FROM Ator WHERE nome = %s AND sobrenome = %s", (nome, sobrenome))
        r = cur.fetchone()
        if r:
            return r[0]
        cur.execute("INSERT INTO Ator (nome, sobrenome) VALUES (%s, %s)", (nome, sobrenome))
        conn.commit()
        return cur.lastrowid
    finally:
        cur.close()

def _get_or_create_diretor(conn, full_name: str) -> int:
    parts = full_name.strip().rsplit(" ", 1)
    if len(parts) == 1:
        nome = parts[0]
        sobrenome = ""
    else:
        nome, sobrenome = parts
    cur = conn.cursor()
    try:
        cur.execute("SELECT id_diretor FROM Diretor WHERE nome = %s AND sobrenome = %s", (nome, sobrenome))
        r = cur.fetchone()
        if r:
            return r[0]
        cur.execute("INSERT INTO Diretor (nome, sobrenome) VALUES (%s, %s)", (nome, sobrenome))
        conn.commit()
        return cur.lastrowid
    finally:
        cur.close()

def insert_filme_basic(fields: Dict) -> int:
    """
    Insere apenas na tabela Filmes (colunas básicas). Retorna id_filme inserido.
    Espera keys: titulo, avaliacao (opcional), tempo_duracao, ano, descricao, poster
    """
    conn = get_connection()
    cur = conn.cursor()
    try:
        sql = """
        INSERT INTO Filmes (titulo, avaliacao, tempo_duracao, ano, descricao, poster)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cur.execute(sql, (
            fields.get("titulo"),
            fields.get("avaliacao"),
            fields.get("tempo_duracao"),
            fields.get("ano"),
            fields.get("descricao"),
            fields.get("poster")
        ))
        conn.commit()
        return cur.lastrowid
    finally:
        cur.close()
        conn.close()

def update_filme_basic(id_filme: int, fields: Dict) -> bool:
    """
    Atualiza campos básicos de Filmes. Retorna True se atualizou (rowcount>0).
    """
    conn = get_connection()
    cur = conn.cursor()
    try:
        sql = """
        UPDATE Filme SET titulo=%s, avaliacao=%s, tempo_duracao=%s, ano=%s, descricao=%s, poster=%s
        WHERE id_filme = %s
        """
        cur.execute(sql, (
            fields.get("titulo"),
            fields.get("avaliacao"),
            fields.get("tempo_duracao"),
            fields.get("ano"),
            fields.get("descricao"),
            fields.get("poster"),
            id_filme
        ))
        conn.commit()
        return cur.rowcount > 0
    finally:
        cur.close()
        conn.close()

def link_relations_for_filme(id_filme: int, payload: Dict):
    """
    Se payload contiver keys 'produtoras' (list[str]), 'generos'(list[str]), 'atores'(list[str]), 'diretores'(list[str]),
    vincula/insere nas tabelas pivot correspondentes.
    """
    conn = get_connection()
    try:
        # PRODUTORAS
        produtoras = payload.get("produtoras") or payload.get("produtora") or []
        if isinstance(produtoras, str):
            produtoras = [p.strip() for p in produtoras.split(",") if p.strip()]
        for p in produtoras:
            idp = _get_or_create_produtora(conn, p)
            cur = conn.cursor()
            try:
                cur.execute("SELECT 1 FROM Produtora_Filme WHERE id_filme=%s AND id_produtora=%s", (id_filme, idp))
                if not cur.fetchone():
                    cur.execute("INSERT INTO Produtora_Filme (id_filme, id_produtora) VALUES (%s, %s)", (id_filme, idp))
                    conn.commit()
            finally:
                cur.close()

        # GENEROS
        generos = payload.get("generos") or payload.get("genero") or []
        if isinstance(generos, str):
            generos = [g.strip() for g in generos.split(",") if g.strip()]
        for g in generos:
            idg = _get_or_create_genero(conn, g)
            cur = conn.cursor()
            try:
                cur.execute("SELECT 1 FROM Genero_Filme WHERE id_filme=%s AND id_genero=%s", (id_filme, idg))
                if not cur.fetchone():
                    cur.execute("INSERT INTO Genero_Filme (id_filme, id_genero) VALUES (%s, %s)", (id_filme, idg))
                    conn.commit()
            finally:
                cur.close()

        # ATORES
        atores = payload.get("atores") or []
        if isinstance(atores, str):
            atores = [a.strip() for a in atores.split(",") if a.strip()]
        for a in atores:
            ida = _get_or_create_ator(conn, a)
            cur = conn.cursor()
            try:
                cur.execute("SELECT 1 FROM Ator_Filme WHERE id_filme=%s AND id_ator=%s", (id_filme, ida))
                if not cur.fetchone():
                    cur.execute("INSERT INTO Ator_Filme (id_filme, id_ator) VALUES (%s, %s)", (id_filme, ida))
                    conn.commit()
            finally:
                cur.close()

        # DIRETORES
        diretores = payload.get("diretores") or payload.get("diretor") or []
        if isinstance(diretores, str):
            diretores = [d.strip() for d in diretores.split(",") if d.strip()]
        for d in diretores:
            idd = _get_or_create_diretor(conn, d)
            cur = conn.cursor()
            try:
                cur.execute("SELECT 1 FROM Diretor_Filme WHERE id_filme=%s AND id_diretor=%s", (id_filme, idd))
                if not cur.fetchone():
                    cur.execute("INSERT INTO Diretor_Filme (id_filme, id_diretor) VALUES (%s, %s)", (id_filme, idd))
                    conn.commit()
            finally:
                cur.close()
    finally:
        conn.close()
