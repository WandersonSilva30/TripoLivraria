from flask import jsonify
from utils.db import get_db_connection

def insert_livro(data):
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500

    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO livros (Titulo, Autor, Genero, AnoPublicacao, Descricao)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            data["Titulo"],
            data["Autor"],
            data["Genero"],
            data["AnoPublicacao"],
            data["Descricao"]
        ))
        conn.commit()
        return jsonify({"mensagem": "Livro cadastrado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"erro": f"Erro ao cadastrar livro: {e}"}), 500
    finally:
        cursor.close()
        conn.close()

def get_livros():
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM livros")
        livros = cursor.fetchall()
        return jsonify(livros), 200
    except Exception as e:
        return jsonify({"erro": f"Erro ao listar livros: {e}"}), 500
    finally:
        cursor.close()
        conn.close()

def delete_livro(livro_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM livros WHERE id = %s", (livro_id,))
        if not cursor.fetchone():
            return jsonify({"erro": "Livro não encontrado"}), 404
        cursor.execute("DELETE FROM livros WHERE id = %s", (livro_id,))
        conn.commit()
        return jsonify({"mensagem": "Livro removido com sucesso!"}), 200
    except Exception as e:
        return jsonify({"erro": f"Erro ao remover livro: {e}"}), 500
    finally:
        cursor.close()
        conn.close()


