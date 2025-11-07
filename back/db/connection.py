# conexão com o MySQL

import mysql.connector
from mysql.connector import Error

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "senai",
    "database": "Plataforma_Filmes_Atualizado3",
    "raise_on_warnings": True,
    "use_pure": True
}

def get_connection():
    """
    Retorna uma conexão nova com o banco. Caller deve fechar connection.cursor() e connection.close().
    """
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
        # Em produção, logar isso em um logger
        raise RuntimeError(f"Erro ao conectar no banco: {e}")
