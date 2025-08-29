from flask import jsonify
from repositories.emprestimo_repository import (
    insert_emprestimo,
    delete_emprestimo,
    get_emprestimos_by_user,
    validar_e_emprestar
)
from datetime import datetime

def registrar(data):
    livro_id = data.get("livroId")
    user_id = data.get("userId")
    if not livro_id or not user_id:
        return jsonify({"erro": "Livros e usuário são obrigatórios"}), 400
    return insert_emprestimo(user_id, livro_id)

def devolver(data):
    emprestimo_id = data.get("emprestimo_id")
    if not emprestimo_id:
        return jsonify({"erro": "ID do empréstimo não informado"}), 400
    return delete_emprestimo(emprestimo_id)

def listar_emprestimos(user_id):
    return get_emprestimos_by_user(user_id)

def emprestar_livro(data):
    livro_id = data.get("livroId")
    user_id = data.get("userId")
    if not livro_id or not user_id:
        return jsonify({"erro": "ID do livro e ID do usuário são obrigatórios"}), 400
    return validar_e_emprestar(user_id, livro_id, datetime.now().date())
