# habilita CORS

# Função utilitária para adicionar headers CORS às responses.
def add_cors_headers(handler):
    handler.send_header("Access-Control-Allow-Origin", "http://localhost:5173")
    handler.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type, X-User-Role, X-User-Id")
    handler.send_header("Access-Control-Allow-Credentials", "true")
