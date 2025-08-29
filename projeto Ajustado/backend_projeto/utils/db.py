from flask_sqlalchemy import SQLAlchemy
from backend_projeto.config import Config

db = SQLAlchemy()

def init_db(app):
    app.config.from_object(Config)
    db.init_app(app)

    with app.app_context():
        db.create_all()
