from flask import Blueprint, request
from services.livro_service import cadastrar, listar, remover

# Cria um "grupo de rotas" para livros
livro_routes = Blueprint('livros', __name__)

@livro_routes.route("/livros", methods=["POST"])
def cadastrar_livro():
    data = request.get_json()
    return cadastrar(data)

@livro_routes.route("/livros", methods=["GET"])
def listar_livros():
    return listar()

@livro_routes.route("/livros/<int:livro_id>", methods=["DELETE"])
def remover_livro(livro_id):
    return remover(livro_id)
