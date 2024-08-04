"""
Models.py define las tablas de la base de datos utilizando SQLAlchemy, que es un ORM (Object Relational Mapper).
Define cómo se almacenan y relacionan los datos en la base de datos.

El parámetro unique determina si los valores de una columna deben ser únicos en toda la tabla. 
Esto significa que no puede haber dos filas en la tabla con el mismo valor en esta columna.
• Objetivo: Garantizar la unicidad de los datos en la columna especificada.
• Valor por defecto: False.

El parámetro nullable determina si una columna puede contener valores NULL. 
En otras palabras, especifica si una columna es obligatoria o no.
• Objetivo: Indicar si los datos en la columna son opcionales (nullable=True) o obligatorios (nullable=False).
• Valor por defecto: True.

La función db.relationship se usa en SQLAlchemy para establecer relaciones entre tablas en la base de datos. 

backref: Crea una propiedad en la tabla que permite acceder a todos, por ejemplo los posts asociados con un usuario con user.posts. 
Este atributo es una lista de todas las instancias de Post relacionadas con ese usuario.

lazy: Este es un parámetro que afecta cómo se cargan los datos relacionados.
SQLAlchemy cargará los datos relacionados de la base de datos cuando se acceda a ellos por primera vez (carga "perezosa")

La función __repr__ define una representación "oficial" de un objeto.
Recibe un argumento self, que es una referencia a la instancia actual del objeto.

Serialize convierte una instancia del modelo en un diccionario que puede ser fácilmente convertido a JSON

"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email
        }

class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('Users', backref=db.backref('posts', lazy=True))

    def __repr__(self):
        return f'<Post {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id
        }

class Medias(db.Model):
    __tablename__ = 'medias'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(200), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post = db.relationship('Posts', backref=db.backref('media', lazy=True))
    def __repr__(self):
        return f'<Media {self.id}, Type: {self.type}>'

    def serialize(self):
        return {
            'id': self.id,
            'type': self.type,
            'url': self.url,
            'post_id': self.post_id
        }

class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_from = db.relationship('Users', foreign_keys=[user_from_id], backref=db.backref('following', lazy='dynamic'))
    user_to = db.relationship('Users', foreign_keys=[user_to_id], backref=db.backref('followers', lazy='dynamic'))

    def __repr__(self):
        return f'<Follower {self.user_from_id} follows {self.user_to_id}>'

    def serialize(self):
        return {
            'user_from_id': self.user_from_id,
            'user_to_id': self.user_to_id
        }

class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(500), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    author = db.relationship('Users', backref=db.backref('comments', lazy=True))
    post = db.relationship('Posts', backref=db.backref('comments', lazy=True))

    def __repr__(self):
        return f'<Comment {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'comment_text': self.comment_text,
            'author_id': self.author_id,
            'post_id': self.post_id
        }

