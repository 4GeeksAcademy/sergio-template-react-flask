from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Characters, Planets, Favorites
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)  


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] =  "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not user:
        response_body['message'] = 'Authorization denied'
        return response_body, 401
    access_token = create_access_token(identity={'email': user.email, 
                                                 'user_id': user.id, 
                                                 'is_admin': user.is_admin})
    response_body['results'] = user.serialize()
    response_body['message'] = 'Bienvenido'
    response_body['access_token'] = access_token
    return response_body, 201


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    current_user = get_jwt_identity()  
    # TODO: buscar en la DB los datos del usuario
    if current_user['is_admin']:
        response_body['message'] = f'Acceso concedido a {current_user["email"]}'
        response_body['results'] = current_user
        return response_body, 200
    response_body['message'] = f'Acceso dengado porque no eres Administrador'
    response_body['results'] = {}
    return response_body, 403


@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = Users()
    user.email = email
    user.password = password
    user.is_active = True
    user.is_admin = False
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity={'email': user.email,
                                                 'user_id': user.id,
                                                 'is_admin': user.is_admin}) 
    response_body['results'] = user.serialize()
    response_body['message'] = 'User registrado y logeado'
    response_body['access_token'] = access_token
    return response_body, 201


@api.route("/favorites", methods=['POST', 'GET'])
@jwt_required()
def handle_favorites():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.execute(db.select(Users).where(Users.id == current_user['user_id'])).scalar()
    if not user:
        response_body["message"] = "Usuario no encontrado"
        return response_body, 404
    if request.method == 'POST':
        data = request.json
        character_id = data.get("character_id")
        planet_id = data.get("planet_id")
        if not character_id and not planet_id:
            response_body["message"] = "Falta el ID del personaje o del planeta"
            return response_body, 400
        if character_id and planet_id:
            response_body["message"] = "Solo puedes agregar un personaje o un planeta a la vez"
            return response_body, 400
        if character_id:
            favorite = Favorites(user_id=current_user['user_id'], character_id=character_id)
        elif planet_id:
            favorite = Favorites(user_id=current_user['user_id'], planet_id=planet_id)
        db.session.add(favorite)
        db.session.commit()
        response_body["message"] = "Favorito añadido"
        return response_body, 201
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == current_user['user_id'])).scalar()
        favorites = Favorites.query.filter_by(user_id=current_user['user_id']).all()
        results = [favorite.serialize() for favorite in favorites]
        response_body['results'] = results
        response_body['message'] = "Lista de favoritos"
        return response_body, 200
