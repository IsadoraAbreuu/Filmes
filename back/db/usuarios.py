from typing import Dict, Optional
from .connection import get_connection
from db import usuarios as usuarios_db
from mysql.connector import Error
import hashlib

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def insert_usuario(usuario: str, email: str, senha: str, role: str = 'comum') -> int:
    conn = get_connection()
    cur = conn.cursor()
    try:
        senha_hash = hash_password(senha)
        sql = """
            INSERT INTO Usuarios (usuario, email, senha_hash, role)
            VALUES (%s, %s, %s, %s)
        """
        cur.execute(sql, (usuario, email, senha_hash, role))
        conn.commit()
        return cur.lastrowid
    except Error as e:
        if e.errno == 1062:
            conn.rollback() 
            raise RuntimeError("Usuário ou email já cadastrado.")
        
        conn.rollback() 
        print(f"Erro ao inserir usuário: {e}")
        raise RuntimeError(f"Erro no banco de dados ao cadastrar: {e}")
    finally:
        cur.close()
        conn.close()

def get_usuario_by_username(usuario: str) -> Optional[Dict]:
    conn = get_connection()
    cur = conn.cursor(dictionary=True)
    try:
        sql = """
            SELECT id_usuario, usuario, email, senha_hash, role
            FROM Usuarios
            WHERE usuario = %s
        """
        cur.execute(sql, (usuario,))
        return cur.fetchone()
    finally:
        cur.close()
        conn.close()

def check_password(usuario_data: Dict, password: str) -> bool:
    if not usuario_data:
        return False
    return usuario_data["senha_hash"] == hash_password(password)
