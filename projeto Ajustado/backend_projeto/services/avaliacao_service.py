# services/avaliacao_service.py
from repositories.avaliacao_repository import criar_avaliacao_db, listar_avaliacoes_db
from flask import jsonify

def criar_avaliacao(data):
    try:
        livro_id = int(data.get("livroId"))
        user_id = int(data.get("userId"))
        nota = int(data.get("nota"))
        comentario = str(data.get("comentario")).strip()
        
        if not all([livro_id, user_id, nota, comentario]):
            return jsonify({"erro": "Todos os campos são obrigatórios"}), 400
        
        if nota < 1 or nota > 5:
            return jsonify({"erro": "Nota deve ser entre 1 e 5"}), 400
            
        return criar_avaliacao_db(livro_id, user_id, nota, comentario)
        
    except ValueError:
        return jsonify({"erro": "IDs e nota devem ser números inteiros"}), 400
    except Exception as e:
        return jsonify({"erro": f"Erro ao processar avaliação: {str(e)}"}), 500

def listar_avaliacoes(user_id=None, livro_id=None):
    try:
        if user_id:
            user_id = int(user_id)
        if livro_id:
            livro_id = int(livro_id)
            
        return listar_avaliacoes_db(user_id, livro_id)
        
    except ValueError:
        return jsonify({"erro": "IDs devem ser números inteiros"}), 400
    except Exception as e:
        return jsonify({"erro": f"Erro ao listar avaliações: {str(e)}"}), 500