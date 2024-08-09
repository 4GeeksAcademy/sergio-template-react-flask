from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Favourites
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
    current_user = get_jwt_identity()  # Access the identity of the current user with get_jwt_identity
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
        response_body['results'] = {}
        response_body["message"] = "Usuario no encontrado"
        return response_body, 404
    if request.method == 'POST':
        data = request.json
        item = data.get("item")
        if not item:
            response_body["message"] = "favoritos no encontrados"
            return response_body, 400
        favorites = Favorites(item=item, user_id=current_user['user_id'])
        db.session.add(favorites)
        db.session.commit()
        response_body["message"] = "Favorito añadido"
        return response_body, 201
    if request.method == 'GET':
        favorites = db.session.execute(db.select(Favorites).where(Favorites.user_id == current_user['user_id'])).scalars()
        results = [{"id": row.id, "item": row.item} for row in favorites]
        response_body['results'] = results
        response_body['message'] = f'Favorito de {current_user["email"]} eliminado'
        return response_body, 200


    
"""@api.route('/favourites/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_favourite(user_id):
    response_body = {}
    favourite = db.session.execute(db.select(Favourites).where(Favourites.id == user_id)).scalar()
    if not favourite:
        response_body['message'] = f'Favorito de {user_id} no encontrado'
        return response_body, 400
    if request.method == 'GET':
        response_body['favourite'] = favourite.serialize()
        response_body['message'] = f'Favorito/s de {user_id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        if 'item' in data: favourite.item = data['item']
        db.session.commit()
        response_body['message'] = f'Favorito de {user_id} actualizado'
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(favourite)
        db.session.commit()
        response_body ['message'] = f'Favorito de {user_id} eliminado'
        return response_body, 200"""
