"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

# Importar funciones JWT
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Habilitar CORS en este blueprint
CORS(api)


# Endpoint de prueba incluido en la plantilla
@api.route('/hello', methods=['GET', 'POST'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend!"
    }
    return jsonify(response_body), 200


# Registrar un nuevo usuario
@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email y password requeridos"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 400

    new_user = User(email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado exitosamente"}), 201


# Iniciar sesión y obtener token
@api.route('/token', methods=['POST'])
def create_token():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Faltan credenciales"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({"token": token}), 200


# Ruta privada protegida por JWT
@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)

    return jsonify({
        "msg": "Acceso autorizado",
        "user": user.serialize()
    }), 200
