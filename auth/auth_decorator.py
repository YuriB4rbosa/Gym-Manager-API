from functools import wraps
from flask import request, jsonify, current_app

def internal_auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token_recebido = request.headers.get("x-internal-token")
        token_esperado = current_app.config.get("INTERNAL_API_TOKEN")

        if not token_recebido:
            return jsonify({"error": "Token não informado"}), 401

        if token_recebido != token_esperado:
            return jsonify({"error": "Token inválido"}), 401

        return f(*args, **kwargs)

    return decorated