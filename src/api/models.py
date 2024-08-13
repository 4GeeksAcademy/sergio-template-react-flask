from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    firstname = db.Column(db.String(80), nullable=True)
    lastname = db.Column(db.String(80), nullable=True)
    identification_type = db.Column(db.Enum('DNI', 'NIE', 'Passport', name='identification_type'), nullable=True)
    identification_number = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'identification_type': self.identification_type,
            'identification_number': self.identification_number,
            'is_active': self.is_active,
            'is_admin': self.is_admin
        }


class Characters(db.Model):
    __tablename__ = 'characters'
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f'<Character {self.item}>'

    def serialize(self):
        return {
            'id': self.id,
            'item': self.item
        }


class Planets(db.Model):
    __tablename__ = 'planets'
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f'<Planet {self.item}>'

    def serialize(self):
        return {
            'id': self.id,
            'item': self.item
        }


class Favorites(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), nullable=True)
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), nullable=True)
    user = db.relationship('Users', backref=db.backref('favorites', lazy=True))
    character = db.relationship('Characters', backref=db.backref('favorites', lazy=True))
    planet = db.relationship('Planets', backref=db.backref('favorites', lazy=True))

    def __repr__(self):
        return f'<Favorite {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'character_id': self.character_id,
            'planet_id': self.planet_id
        }
