from flask import Flask, jsonify
from flask_cors import CORS

from controllers.user_controller import user_routes
from controllers.livro_controller import livro_routes
from controllers.emprestimo_controller import emprestimo_routes
from controllers.avaliacao_controller import avaliacao_routes
from utils.db import init_db


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Inicializar banco
    init_db(app)

    # Rotas principais da API
    app.register_blueprint(user_routes, url_prefix="/api/users")
    app.register_blueprint(livro_routes, url_prefix="/api/livros")
    app.register_blueprint(emprestimo_routes, url_prefix="/api/emprestimos")
    app.register_blueprint(avaliacao_routes, url_prefix="/api/avaliacoes")

    # Rota raiz
    @app.route("/")
    def home():
        return jsonify({"msg": "API rodando na Vercel!"})

    return app


# A Vercel precisa dessa variável
app = create_app()
