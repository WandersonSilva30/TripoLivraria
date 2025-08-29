from flask import jsonify
from repositories.livro_repository import insert_livro, get_livros, delete_livro

def cadastrar(data):
    required_fields = ["Titulo", "Autor", "Genero", "AnoPublicacao", "Descricao"]
    if not all(field in data for field in required_fields):
        return jsonify({"erro": "Todos os campos são obrigatórios"}), 400
    return insert_livro(data)

def listar():
    return get_livros()

def remover(livro_id):
    return delete_livro(livro_id)
