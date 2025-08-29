from repositories.user_repository import find_user_by_credentials, create_user
from utils.jwt_handler import generate_token
from flask import jsonify
# user_service.py
from repositories.user_repository import (
    find_user_by_credentials, 
    find_admin_by_credentials  # Certifique-se que está importando corretamente
)


# user_service.py (correção)
def login_user(data):
    login = data.get("login")
    password = data.get("password")
    if not login or not password:
        return jsonify({"erro": "Campos obrigatórios"}), 400

    # Verifica admin primeiro
    admin_user = find_admin_by_credentials(login, password)  # Renomeei para admin_user para ficar mais claro
    if admin_user:
        token = generate_token(admin_user)
        return jsonify({
            "userID": admin_user["id"],
            "userName": admin_user["name"],
            "jwt_token": token,
            "redirectTo": "adm.html",
            "isAdmin": True  # Adicionei esta flag para facilitar no frontend
        })

    # Verifica usuário normal
    regular_user = find_user_by_credentials(login, password)  # Renomeei para regular_user
    if regular_user:
        token = generate_token(regular_user)
        return jsonify({
            "userID": regular_user["id"],
            "userName": regular_user["name"],
            "jwt_token": token,
            "redirectTo": "dashboard.html",
            "isAdmin": False
        })
    
    return jsonify({"erro": "Credenciais inválidas"}), 401
def register_user(data):
    # lógica semelhante...
    ...
if __name__ == "__main__":
    # Teste direto da função
    test_data = {"login": "admin", "password": "123"}  # Use as credenciais corretas
    admin = find_admin_by_credentials(test_data["login"], test_data["password"])
    print("Resultado find_admin_by_credentials:", admin)
    
    user = find_user_by_credentials(test_data["login"], test_data["password"])
    print("Resultado find_user_by_credentials:", user)
    
    print("Resultado login_user:", login_user(test_data))