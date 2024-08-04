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







