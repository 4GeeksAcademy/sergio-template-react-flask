from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Medias, Followers, Comments

api = Blueprint('api', __name__)
CORS(api)  


@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        results = []
        for row in rows:
            results.append(row.serialize())
        response_body['results'] = results
        response_body['message'] = "Lista de usuarios"
        return jsonify(response_body), 200
    if request.method == 'POST':
        data = request.json
        # Se intenta obtener los valores de username y email del diccionario data. 
        # Si alguna de estas claves no está presente en data, se asigna el valor None.
        username = data.get('username', None)
        email = data.get('email', None)
        # Verificamos si username o email son None. 
        # Si alguno de ellos lo es, significa que faltan datos importantes. 
        # En tal caso, se establece un mensaje de error en response_body, 
        # se añade un diccionario vacío a results, y se retorna una respuesta con el estado 400 Bad Request.
        if not username or not email:
            response_body['message'] = 'Faltan datos'
            response_body['results'] = {}
            return response_body, 400
        #  Preguntamos si alguien tiene un nombre de usuario o un correo electrónico específico. 
        username_exist = db.session.execute(db.select(Users).where(Users.username == username)).scalar()
        email_exist = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
        if username_exist or email_exist:
            response_body['message'] = 'El usuario ya existe'
            response_body['results'] = {}
            return response_body, 404
        # Sino exixte se crea una nueva instancia para Users con los detalles del nuevo usuario.
        row = Users(username = data['username'], 
                    email = data['email'],
                    firstname = data['firstname'],
                    lastname = data['lastname'])
        # añade esta nueva instancia a la sesión de la base de datos y hace un commit para guardar los cambios
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
        # obtengo los datos JSON del request
        data = request.get_json()
        # buscar el usuario por id
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not user:
            response_body['results'] = {}
            response_body['message'] = f'No existe el usuario {user_id}'
            return response_body, 404
        # cuando lo encuentre, tomamos los datos (data.get()) y actualizando los campos del usuario que hemos encontrado en la base de datos. 
        # Si algún campo no está en los datos de la solicitud, mantenemos el valor actual de ese campo en el usuario.
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.firstname = data.get('firstname', user.firstname)
        user.lastname = data.get('lastname', user.lastname)
        db.session.commit()
        response_body['results'] = user.serialize()
        response_body['message'] = f'Usuario {user_id} actualizado'
        return response_body, 200
    if request.method == 'DELETE':
        # Obtenemos la instancia del usuario a eliminar
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not user:
            response_body['results'] = {}
            response_body['message'] = f'No existe el usuario {user_id}'
            return response_body, 404
        # instancia para la eliminación
        db.session.delete(user)
        db.session.commit()
        response_body['message'] = f'Usuario {user_id} eliminado'
        return response_body, 200


@api.route('/posts', methods=['GET', 'POST'])
def handle_posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        results = []
        for row in rows:
            results.append(row.serialize())
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
            response_body['message'] = 'El posts ya existe'
            response_body['results'] = {}
            return response_body, 404
        row = Posts(id = data['id'], 
                    user_id = data['user_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "Post agregado"
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_post(post_id):   
    response_body = {}
    if request.method == 'GET':
        post = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if not post:
            response_body['results'] = {}
            response_body['message'] = f'No existe el post de ese usuario'
            return jsonify(response_body), 404
        response_body['results'] = post.serialize()
        response_body['message'] = f'Recibí el GET request de {post_id}'
        return jsonify(response_body), 200
    if request.method == 'PUT':
        data = request.get_json()
        post = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if not post:
            response_body['results'] = {}
            response_body['message'] = f'No existe el post {post_id}'
            return jsonify(response_body), 404
        post.user_id = data.get('user_id', post.user_id)
        db.session.commit()
        response_body['results'] = post.serialize()
        response_body['message'] = f'Post {post_id} actualizado'
        return jsonify(response_body), 200
    if request.method == 'DELETE':
        post = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if not post:
            response_body['results'] = {}
            response_body['message'] = f'No existe el post {post_id}'
            return jsonify(response_body), 404
        db.session.delete(post)
        db.session.commit()
        response_body['message'] = f'Post {post_id} eliminado'
        return jsonify(response_body), 200


@api.route('/medias', methods=['GET', 'POST'])
def handle_medias():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Medias)).scalars()
        results = []
        for row in rows:
            results.append(row.serialize())
        response_body['results'] = results
        response_body['message'] = "Lista de medias"
        return jsonify(response_body), 200
    if request.method == 'POST':
        data = request.json
        id = data.get('id', None)
        if not id:
            response_body['message'] = 'Faltan datos'
            response_body['results'] = {}
            return response_body, 400
        id_exist = db.session.execute(db.select(Medias).where(Medias.id == id)).scalar()
        if id_exist:
            response_body['message'] = 'Media ya existe'
            response_body['results'] = {}
            return response_body, 404
        row = Medias(id = data['id'],
                    type = data['type'],
                    url = data['url'],
                    post_id = data['post_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "Media añadido"
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/medias/<int:media_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_media(media_id):   
    response_body = {}
    if request.method == 'GET':
        media = db.session.execute(db.select(Medias).where(Medias.id == media_id)).scalar()
        if not media:
            response_body['results'] = {}
            response_body['message'] = f'No existe esa media'
            return jsonify(response_body), 404
        response_body['results'] = media.serialize()
        response_body['message'] = f'Recibí la media request de {media_id}'
        return jsonify(response_body), 200
    if request.method == 'PUT':
        data = request.get_json()
        media = db.session.execute(db.select(Medias).where(Medias.id == media_id)).scalar()
        if not media:
            response_body['results'] = {}
            response_body['message'] = f'No existe el post {media_id}'
            return jsonify(response_body), 404
        media.type = data.get('type', media.type)
        media.url = data.get('url', media.url)
        media.post_id = data.get('post_id', media.post_id)
        db.session.commit()
        response_body['results'] = media.serialize()
        response_body['message'] = f'Media {media_id} actualizado'
        return jsonify(response_body), 200
    if request.method == 'DELETE':
        media = db.session.execute(db.select(Medias).where(Medias.id == media_id)).scalar()
        if not media:
            response_body['results'] = {}
            response_body['message'] = f'No existe el media {media_id}'
            return jsonify(response_body), 404
        db.session.delete(media)
        db.session.commit()
        response_body['message'] = f'Media {media_id} eliminado'
        return jsonify(response_body), 200
