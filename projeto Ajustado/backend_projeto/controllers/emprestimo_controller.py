from flask import Blueprint, request
from services.emprestimo_service import registrar, devolver, listar_emprestimos, emprestar_livro

emprestimo_routes = Blueprint('emprestimos', __name__)

@emprestimo_routes.route("/emprestimos", methods=["POST"])
def registrar_emprestimo():
    data = request.get_json()
    return registrar(data)

@emprestimo_routes.route("/emprestimos/devolver", methods=["POST"])
def devolver_livro():
    data = request.get_json()
    return devolver(data)

@emprestimo_routes.route("/emprestimos", methods=["GET"])
def listar():
    user_id = request.args.get("user_id")
    return listar_emprestimos(user_id)

@emprestimo_routes.route("/emprestimos/novo", methods=["POST"])
def emprestar():
    data = request.get_json()
    return emprestar_livro(data)
