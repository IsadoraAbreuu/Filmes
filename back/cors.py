# habilita CORS

# Função utilitária para adicionar headers CORS às responses.
def add_cors_headers(handler):
    origin = handler.headers.get("Origin")
    # Se vier do front local, libera explicitamente
    if origin and "localhost:5173" in origin:
        handler.send_header("Access-Control-Allow-Origin", origin)
    else:
        handler.send_header("Access-Control-Allow-Origin", "*")

    handler.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type, X-User-Role, X-User-Id")
    handler.send_header("Access-Control-Allow-Credentials", "true")

