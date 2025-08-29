# controllers/avaliacao_controller.py
from flask import Blueprint, request, jsonify
from services.avaliacao_service import criar_avaliacao, listar_avaliacoes

avaliacao_routes = Blueprint('avaliacoes', __name__)

@avaliacao_routes.route("/avaliacoes", methods=["POST"])
def criar():
    data = request.get_json()
    return criar_avaliacao(data)

@avaliacao_routes.route("/avaliacoes", methods=["GET"])
def listar():
    user_id = request.args.get('userId')
    livro_id = request.args.get('livroId')
    return listar_avaliacoes(user_id, livro_id)