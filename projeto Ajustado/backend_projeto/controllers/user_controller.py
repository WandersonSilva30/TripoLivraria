from flask import Blueprint, request, jsonify
from services.user_service import login_user, register_user

user_routes = Blueprint('users', __name__)

@user_routes.route("/users/login", methods=["POST"])
def login():
    data = request.get_json()
    return login_user(data)

@user_routes.route("/users/register", methods=["POST"])
def register():
    data = request.get_json()
    return register_user(data)
