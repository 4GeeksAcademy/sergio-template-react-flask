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





