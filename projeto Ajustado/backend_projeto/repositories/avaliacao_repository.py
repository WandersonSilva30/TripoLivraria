# repositories/avaliacao_repository.py
from utils.db import get_db_connection
from flask import jsonify

def criar_avaliacao_db(livro_id, user_id, nota, comentario):
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        # Verifica se o livro existe
        cursor.execute("SELECT id FROM livros WHERE id = %s", (livro_id,))
        if not cursor.fetchone():
            return jsonify({"erro": "Livro não encontrado"}), 404
        
        # Verifica se o usuário existe
        cursor.execute("SELECT id FROM users WHERE id = %s", (user_id,))
        if not cursor.fetchone():
            return jsonify({"erro": "Usuário não encontrado"}), 404
        
        # Insere a avaliação
        cursor.execute("""
            INSERT INTO avaliacoes (livro_id, user_id, nota, comentario)
            VALUES (%s, %s, %s, %s)
        """, (livro_id, user_id, nota, comentario))
        
        conn.commit()
        return jsonify({"mensagem": "Avaliação criada com sucesso"}), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({"erro": f"Erro ao criar avaliação: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

def listar_avaliacoes_db(user_id=None, livro_id=None):
    conn = get_db_connection()
    if not conn:
        return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        
        query = """
            SELECT 
                a.id,
                a.nota,
                a.comentario,
                a.livro_id,
                l.Titulo as livro_titulo,
                a.user_id,
                u.name as user_name
            FROM avaliacoes a
            JOIN livros l ON a.livro_id = l.id
            JOIN users u ON a.user_id = u.id
        """
        
        params = []
        conditions = []
        
        if user_id:
            conditions.append("a.user_id = %s")
            params.append(user_id)
        
        if livro_id:
            conditions.append("a.livro_id = %s")
            params.append(livro_id)
        
        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        
        cursor.execute(query, params)
        avaliacoes = cursor.fetchall()
        
        return jsonify(avaliacoes), 200
        
    except Exception as e:
        return jsonify({"erro": f"Erro ao listar avaliações: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()