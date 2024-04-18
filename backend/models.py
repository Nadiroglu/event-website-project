from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import re
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()


class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable = False)
    email = db.Column(db.String(120), unique =True, nullable = False)
    _password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    profile_picture_url = db.Column(db.String(255))
    role = db.Column(db.String, default = 'User')

    organizer_events = db.relationship('OrganizerEvents', back_populates = 'organizer')
    events = association_proxy('organizer_events', 'event')
    tickets = db.relationship('Ticket', back_populates='user')
    serialize_rules =("-organizer_events.organizer", '-tickets') # "-event",

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Username is required')
        if len(username) > 50:
            raise ValueError('Username must be less than or equal to 50 characters')
        return username
    
    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError('Email is required')
        if len(email) > 120:
            raise ValueError('Email must be max 120 characters. Please type different Email')
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError('Invalid email adress format')
        return email
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, new_password):
        if new_password is not None:
            pass_hash = bcrypt.generate_password_hash(new_password.encode('utf-8'))
            self._password_hash = pass_hash.decode('utf-8')

    def authenticate(self, password):
        if self._password_hash is None:
            return False
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"User ('{self.username}', '{self.email})"


class OrganizerEvents(db.Model, SerializerMixin):
    __tablename__ = 'organizer_events'
    id = db.Column(db.Integer, primary_key = True)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    organizer = db.relationship('User', back_populates = 'organizer_events')
    event = db.relationship('Event', back_populates = 'organizer_events')
    serialize_rules = ("-organizer.organizer_events", "-event.organizer_events")



class Event(db.Model, SerializerMixin):

    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    description = db.Column(db.Text, nullable = False)
    location = db.Column(db.String(100))
    date_time = db.Column(db.DateTime)
    ticket_price = db.Column(db.Float)
    stream_url = db.Column(db.String(255))
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'))


    organizer_events = db.relationship('OrganizerEvents', back_populates = 'event')
    organizers = association_proxy('organizer_events', 'organizer')
    merchandise = db.relationship('Merchandise', back_populates = 'event')
    tickets = db.relationship('Ticket', back_populates='event')
    serialize_rules = ("-organizer_events.event", "-merchandise.event", '-tickets.event') #"-organizer"

    

    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise ValueError('Event title is required')
        if len(title) > 100:
            raise ValueError('Event title must be maximum 100 characters')
        return title

    def __repr__(self):
        return f"Event ('{self.title}', '{self.date_time}')"
    
class Merchandise(db.Model, SerializerMixin):
    __tablename__ = 'merchandises'

    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)

    event = db.relationship('Event', back_populates = 'merchandise')

    serialize_rules = ['-event.merchandise']

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Merchandise name is required.")
        return name

    @validates('price')
    def validate_price(self, key, price):
        if not price:
            raise ValueError("Merchandise price is required.")
        price_value = float(price)
        if price_value < 0:
            raise ValueError("Merchandise price cannot be negative.")
        return price


    def __repr__(self):
        return f"Merchandise('{self.name}', '{self.price}')"

class Ticket(db.Model, SerializerMixin):

    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key = True)
    purchase_date = db.Column(db.DateTime, nullable = False)
    status = db.Column(db.String, default = 'purchased')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    user = db.relationship("User", back_populates = "tickets")
    event = db.relationship("Event", back_populates = "tickets")

    serialize_rules = ['-user', 'event.tickets']

    @validates
    def validate_date(self, key, purchase_date):
        if not purchase_date:
            raise ValueError('Please type the date')
        return purchase_date
     
    def __repr__(self):
        return f"Ticket('{self.user_id}', '{self.event_id}')"
    
    
# class Message(db.Model, SerializerMixin):
#     __tablename__ = 'messages'

#     id = db.Column(db.Integer, primary_key = True)
#     content = db.Column(db.String, nullable = False)
#     timestamp = db.Column(db.DateTime, nullable = False)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     event_id = db.Column(db.Integer, db.ForeignKey('events.id'))


#     user = db.relationship('User', back_populates = 'messages')
#     event = db.relationship('Event', back_populates = 'messages')

#     serialize_rules =['-user.messages', '-event.messages']

#     @validates('content')
#     def validate_content(self, key, content):
#         if not content:
#             raise ValueError("Message content is required.")
#         return content


#     def __repr__(self):
#         return f"Message('{self.content}', {self.timestamp})"


# class Poll(db.Model, SerializerMixin):
#     __tablename__ = 'polls'

#     id = db.Column(db.Integer, primary_key = True)
#     question = db.Column(db.String(255), nullable = False)
#     options = db.Column(db.JSON, nullable = False)
#     results = db.Column(db.JSON)
#     event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable = False)

#     event = db.relationship('Event', back_populates = 'polls')

#     serialize_rules = ['-event.polls']

#     @validates('question')
#     def validate_question(self, key, question):
#         if not question:
#             raise ValueError("Poll question is required.")
#         return question

#     def __repr__(self):
#         return f"Poll('{self.question}')"


    





