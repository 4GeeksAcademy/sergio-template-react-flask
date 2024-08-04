from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Medias, Followers, Comments
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)  

@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        response_body['message'] = 'Bad username or password'
        return response_body, 401
    access_token = create_access_token(identity=username)
    response_body['message'] = 'User logged'
    response_body['access_token'] = access_token
    # return jsonify(access_token=access_token)
    return response_body, 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body['message'] = f'Acceso conceido {current_user}'
    return response_body, 200

@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]  # List comprehension
        response_body['results'] = results
        response_body['message'] = "Lista de usuarios"
        return jsonify(response_body), 200
    if request.method == 'POST':
        data = request.json
        username = data.get('username', None)
        email = data.get('email', None)
        if not username or not email:
            response_body['message'] = 'Faltan datos'
            response_body['results'] = {}
            return response_body, 400
        username_exist = db.session.execute(db.select(Users).where(Users.username == username)).scalar()
        email_exist = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
        if username_exist or email_exist:
            response_body['message'] = 'El usuario ya existe'
            response_body['results'] = {}
            return response_body, 404
        row = Users(username = data['username'], 
                    email = data['email'],
                    firstname = data['firstname'],
                    lastname = data['lastname'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "Usuario agregado"
        response_body['results'] = row.serialize()
        return response_body, 200

@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f'No existe el usuario {user_id}'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'recibí el GET request {user_id}'
        return response_body, 200
    if request.method == 'PUT':
        response_body['message'] = f'recibí el PUT request {user_id}'
        return response_body, 200
    if request.method == 'DELETE':
        response_body['message'] = f'recibí el DELETE request {user_id}'
        return response_body, 200

@api.route('/posts', methods=['GET', 'POST'])
def handle_posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        results = [row.serialize() for row in rows]  # List comprehension
        response_body['results'] = results
        response_body['message'] = "Lista de posts"
        return jsonify(response_body), 200
    if request.method == 'POST':
        data = request.json
        id = data.get('id', None)
        user_id = data.get('user_id', None)
    if not id or not user_id:
        response_body['message'] = 'Faltan datos'
        response_body['results'] = {}
        return response_body, 400
    id_exist = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    user_id_exist = db.session.execute(db.select(Posts).where(Posts.user_id == user_id)).scalar()
    if id_exist or user_id_exist:
        response_body['message'] = 'El usuario ya existe'
        response_body['results'] = {}
        return response_body, 404
        row = Posts(username = data['id'], 
                    email = data['user_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "Post agregado"
        response_body['results'] = row.serialize()
        return response_body, 200



@api.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_post(post_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f'No existe el usuario {post_id}'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'recibí el GET request {post_id}'
        return response_body, 200
    if request.method == 'PUT':
        response_body['message'] = f'recibí el PUT request {post_id}'
        return response_body, 200
    if request.method == 'DELETE':
        response_body['message'] = f'recibí el DELETE request {post_id}'
        return response_body, 200



