import jwt
from flask import jsonify
from config import SECRET_KEY

def generate_token(user_data):
    payload = {
        "userID": user_data["id"],
        "userName": user_data["name"]
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
