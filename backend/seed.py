from app import app
from models import db, User, Event, Merchandise, Ticket, OrganizerEvents
from datetime import datetime

with app.app_context():

    print('Deleting data')

    db.session.query(User).delete()
    db.session.query(Event).delete()
    db.session.query(Merchandise).delete()
    db.session.query(Ticket).delete()
    db.session.query(OrganizerEvents).delete()

    # db.session.query(Message).delete()
    # db.session.query(Poll).delete()

    print('Creating users')

    user = User(username='nailowski', email='nail@gmail.com', password_hash ='nail123', first_name='Nail', last_name ='Osmanli', profile_picture_url ='abc', role ='User')
    organizer = User(username='ben', email='ben@gmail.com', password_hash ='ben123', first_name='Ben', last_name ='Cavins', profile_picture_url ='abc', role = 'Organizer')
    users = [user, organizer] 

    

    print('Users created successfully')


    print('Creating Events')
    event1 = Event(
        title='Hackathon',
        description='A live music concert featuring various artists.',
        location='City Concert Hall',
        date_time=datetime.strptime('2024-04-15 19:00:00', '%Y-%m-%d %H:%M:%S'),
        ticket_price=30.00,
        stream_url='https://example.com/live-stream',
        category='Development',
        image_url='https://images.pexels.com/photos/19451448/pexels-photo-19451448/free-photo-of-two-people-sitting-at-a-table-with-a-laptop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
        organizer_id=1) 
    event2 = Event(
        title='Concert',
        description='An annual tech conference showcasing latest innovations.',
        location='Tech Center',
        date_time= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'),  
        ticket_price=100.00,
        stream_url=None,  
        category='HipHop',
        image_url='https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
        organizer_id=2)
    event3 = Event(
        title='Concert',
        description='An annual tech conference showcasing latest innovations.',
        location='Tech Center',
        date_time= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'),  
        ticket_price=100.00,
        stream_url=None,  
        category='Jazz',
        image_url='https://images.pexels.com/photos/3812950/pexels-photo-3812950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        organizer_id=2)
    event4 = Event(
        title='Concert',
        description='An annual tech conference showcasing latest innovations.',
        location=' // Flatiron School',
        date_time= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'),  
        ticket_price=100.00,
        stream_url=None,  
        category='Blue',
        image_url='https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        organizer_id=2)
    event5 = Event(
        title='Conference',
        description='An annual tech conference showcasing latest innovations.',
        location='Tech Center',
        date_time= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'),  
        ticket_price=100.00,
        stream_url=None,  
        category='Technology',
        image_url='https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        organizer_id=2)
    event6 = Event(
        title='Art',
        description='An annual tech conference showcasing latest innovations.',
        location='Tech Center',
        date_time= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'),  
        ticket_price=100.00,
        stream_url=None,  
        category='Painting',
        image_url='https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        organizer_id=2)
    event7 = Event(
        title='Science',
        description='An annual tech conference showcasing latest innovations.',
        location='Tech Center',
        date_time= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'),  
        ticket_price=100.00,
        stream_url=None,  
        category='Painting',
        image_url='https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg',
        organizer_id=2)
    events = [event1, event2, event3, event4, event5, event6, event7]


    print('Creating tickets')

    ticket1 = Ticket(
        purchase_date= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'),  # Example purchase datetime string (YYYY-MM-DD HH:MM:SS)
        user_id=1,  # Associate ticket with a specific user
        event_id=1, # Associate ticket with a specific event
    )

    ticket2 = Ticket(
        purchase_date= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'), # Example purchase datetime string (YYYY-MM-DD HH:MM:SS)
        user_id=2,  # Associate ticket with the same user as above
        event_id=2  # Associate ticket with the same event as above
    )
    tickets = [ticket1, ticket2]

    # print('Creating Messages')
    # message1 = Message(
    #     content='Hello everyone!',
    #     timestamp= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'),  
    #     user_id=1,  
    #     event_id=1  
    # )

    # message2 = Message(
    #     content='Excited for the event!',
    #     timestamp= datetime.strptime('2024-04-15 9:00:00', '%Y-%m-%d %H:%M:%S'), # Example datetime string (YYYY-MM-DD HH:MM:SS)
    #     user_id=2,  # Assuming user_id corresponds to another existing user ID
    #     event_id=1  # Assuming event_id corresponds to the same existing event ID as message1
    # )
    
    # messages = [message1, message2]

    # print('creating polls')
    # poll1 = Poll(
    #     question='What is your favorite session topic?',
    #     options=['Machine Learning', 'Web Development', 'Data Science'],
    #     event_id=1  
    # )
    # polls = [poll1]

    print('creating merchs')
    merchandise1 = Merchandise(
        name='T-shirt',
        description='Premium quality event T-shirt',
        price=25.00,
        image_url='https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        event_id=1  # Assuming event_id corresponds to an existing event ID
    )

    merchandise2 = Merchandise(
        name='Mug',
        description='Limited edition event mug',
        price=15.00,
        image_url='https://images.pexels.com/photos/1239422/pexels-photo-1239422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        event_id=2  # Assuming event_id corresponds to the same existing event ID as merchandise1
    )
    merchandise3 = Merchandise(
        name='Hat',
        description='Limited edition event mug',
        price=15.00,
        image_url='https://images.pexels.com/photos/1878821/pexels-photo-1878821.jpeg',
        event_id=3  # Assuming event_id corresponds to the same existing event ID as merchandise1
    )
    merchandise4 = Merchandise(
        name='Classic Shoes',
        description='The most famous K-Pop Star Sammy`s dating shoes will be on sale',
        price=15.00,
        image_url='https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        event_id=4  # Assuming event_id corresponds to the same existing event ID as merchandise1
    )
    merchandise5 = Merchandise(
        name='Book',
        description='Reading books',
        price=15.00,
        image_url='hhttps://images.pexels.com/photos/768125/pexels-photo-768125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        event_id=5  # Assuming event_id corresponds to the same existing event ID as merchandise1
    )
    merchandise6 = Merchandise(
        name='socks',
        description='They won`n smell ever',
        price=15.00,
        image_url='https://images.pexels.com/photos/1287513/pexels-photo-1287513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        event_id=6 # Assuming event_id corresponds to the same existing event ID as merchandise1
    )
    merchs = [merchandise1, merchandise2, merchandise3, merchandise4, merchandise5, merchandise6]

    print("Creating organizers")

    organizer1 = OrganizerEvents(
        organizer_id = 1,
        event_id = 2
    )

    organizer2 = OrganizerEvents(
        organizer_id = 2,
        event_id = 4
    )
    organizers = [organizer1, organizer2]


    db.session.add_all(users)
    db.session.add_all(events)
    db.session.add_all(tickets)
    db.session.add_all(organizers)

    # db.session.add_all(messages)
    # db.session.add_all(polls)
    db.session.add_all(merchs)
    db.session.commit()

    print('DONE!')