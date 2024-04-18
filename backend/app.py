#!/usr/bin/env python3
from models import db, User, Event, Merchandise, Ticket
from flask_migrate import Migrate
import stripe
from flask import Flask, request, make_response, jsonify, session, redirect, json
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from datetime import datetime



BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")



app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'asdcasdcasdacsd'
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

stripe.api_key = 'sk_test_51P5xgsKiofAVDtVIgVKnPOZh63ZLc2CyZvWeQGJloskP35dw7LOeasSFnkMVgQ7V9wzObP77q0oTDVRs7Gmpr7Ny00iXobH4bn'

api = Api(app)
CORS(app, supports_credentials=True)

@app.route('/')
def home():
    message = 'Welcome'
    return jsonify(message), 200


def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 1400

@app.route('/api/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='usd',
            # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403



@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()

    user = User.query.filter(User.username == data.get('username')).first()

    if user:
        return {'User already exists'}
    
    try:
        new_user = User(
            username = data.get('username'),
            email = data.get('email'),
            password_hash = data.get('password_hash'),
            first_name = data.get('first_name'),
            last_name = data.get('last_name'),
            profile_picture_url = data.get('profile_picture_url'),
            role = data.get('role', 'User')
        )

    except ValueError as e:
        return {"error": ["validation errors"]}, 400
    
    db.session.add(new_user)
    db.session.commit()
    
    return new_user.to_dict(), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if not user or not user.authenticate(password):
        return jsonify({'error': 'Invalid username or password'}), 401

    # Check if user is already logged in
    if 'user_id' in session:
        user_id = session['user_id']
        user = User.query.get(user_id)
        if user:
            return jsonify({'message': 'You are already logged in', 'user': user.to_dict()}), 200

    # Set user_id in session for current login
    session['user_id'] = user.id

    # Return user data along with success message
    return jsonify({'message': 'Login successful', 'user': user.to_dict()}), 200
    

@app.route('/api/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    return {'ms': 'Succesfully logout'}, 204

@app.route('/api/check_session')
def check_session():
    user_id = session.get('user_id')

    user = User.query.filter(User.id == user_id).first()

    if not user:
        return {'error': 'User not found gagi'}, 401
    else:
        return user.to_dict(rules=['-_password_hash']), 200
    

@app.route('/api/users/<int:id>')
def user_by_id(id):
    user = User.query.filter(User.id == id).first()

    if not user:
        return {"Error": "User not found"}
    return user.to_dict(), 200



@app.route('/api/events', methods=['GET', 'POST'])
def get_events():
    if request.method == 'GET':
        events = Event.query.all()
        event_dict = []
        for event in events:
            event_dict.append(event.to_dict())

        return event_dict, 200
    elif request.method == 'POST':
        data = request.get_json()
        try:
            date_time_str = data.get('date_time')
            date_time = datetime.strptime(date_time_str, '%Y-%m-%d')
            new_event = Event(
                title = data.get('title'),
                description = data.get('description'),
                location = data.get('location'),
                date_time= date_time,
                ticket_price= data.get('ticket_price'),
                stream_url= data.get('stream_url'),
                category= data.get('category'),
                image_url= data.get('image_url'),
                organizer_id= data.get('organizer_id')
            )
        except ValueError as e:
            return {'error': str(e)}, 400

        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict(), 201



@app.route('/api/events/<int:id>')
def event_details(id):
    event = Event.query.filter_by(id=id).first()

    if not event:
        return {"Error": "Event not found"}
    return event.to_dict(), 200


@app.route('/api/merch', methods=['POST'])
def merchandise():
    data = request.get_json()

    try: 
        new_merch = Merchandise(
            name = data.get('name'),
            description = data.get('description'),
            price = data.get('price'),
            image_url = data.get('image_url'),
            event_id = data.get('event_id')
        )
    except ValueError as e:
        return {'error': str(e)}, 400
    
    db.session.add(new_merch)
    db.session.commit()
    return new_merch.to_dict(), 201





if __name__ == "__main__":
    app.run(port=5555, debug=True)


