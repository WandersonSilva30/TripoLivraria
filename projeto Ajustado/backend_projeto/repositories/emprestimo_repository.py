from flask import jsonify
from utils.db import get_db_connection

def insert_emprestimo(user_id, livro_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO emprestimos (user_id, livro_id) VALUES (%s, %s)
        """, (user_id, livro_id))
        conn.commit()
        return jsonify({"mensagem": "Empréstimo registrado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"erro": f"Erro ao registrar empréstimo: {e}"}), 500
    finally:
        cursor.close()
        conn.close()

def delete_emprestimo(emprestimo_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM emprestimos WHERE id = %s", (emprestimo_id,))
        conn.commit()
        return jsonify({"mensagem": "Livro devolvido com sucesso!"}), 200
    except Exception as e:
        return jsonify({"erro": f"Erro ao devolver livro: {e}"}), 500
    finally:
        cursor.close()
        conn.close()

def get_emprestimos_by_user(user_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT e.id, l.Titulo, l.Autor, e.data_emprestimo
            FROM emprestimos e
            JOIN livros l ON e.livro_id = l.id
            WHERE e.user_id = %s
            ORDER BY e.data_emprestimo DESC
        """
        cursor.execute(query, (user_id,))
        result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"erro": f"Erro ao listar empréstimos: {e}"}), 500
    finally:
        cursor.close()
        conn.close()

def validar_e_emprestar(user_id, livro_id, data_emprestimo):
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    try:
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM livros WHERE id = %s", (livro_id,))
        if not cursor.fetchone():
            return jsonify({"erro": "Livro não encontrado"}), 404

        cursor.execute("""
            SELECT * FROM emprestimos WHERE livro_id = %s AND status = 'emprestado'
        """, (livro_id,))
        if cursor.fetchone():
            return jsonify({"erro": "Livro já está emprestado"}), 400

        cursor.execute("""
            INSERT INTO emprestimos (usuario_id, livro_id, data_emprestimo, status)
            VALUES (%s, %s, %s, 'emprestado')
        """, (user_id, livro_id, data_emprestimo))
        conn.commit()
        return jsonify({"mensagem": "Livro emprestado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"erro": f"Erro ao emprestar livro: {e}"}), 500
    finally:
        cursor.close()
        conn.close()
