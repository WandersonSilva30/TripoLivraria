
from flask import jsonify
from utils.db import get_db_connection
from typing import Optional, Dict

def find_user_by_credentials(login: str, password: str) -> Optional[Dict]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT id, name FROM users 
            WHERE (login = %s OR email = %s) AND password = %s
        """, (login, login, password))
        return cursor.fetchone()
    except Exception as e:
        print(f"Erro ao buscar usuário: {str(e)}")
        return None
    finally:
        if 'cursor' in locals():
            cursor.close()
        conn.close()

def find_admin_by_credentials(login: str, password: str) -> Optional[Dict]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT users.id, users.name 
            FROM users
            JOIN admins ON users.id = admins.user_id
            WHERE (users.login = %s OR users.email = %s) 
            AND users.password = %s
        """, (login, login, password))
        return cursor.fetchone()
    except Exception as e:
        print(f"Erro ao buscar admin: {str(e)}")
        return None
    finally:
        if 'cursor' in locals():
            cursor.close()
        conn.close()

def create_user(nome: str, email: str, senha: str):
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE login = %s OR email = %s", (nome, email))
        if cursor.fetchone():
            return jsonify({"erro": "Usuário ou email já cadastrado"}), 400

        cursor.execute("""
            INSERT INTO users (name, login, email, password) 
            VALUES (%s, %s, %s, %s)
        """, (nome, nome, email, senha))
        conn.commit()
        return jsonify({"mensagem": "Usuário registrado com sucesso!"}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"erro": f"Erro ao registrar usuário: {e}"}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        conn.close()