# FlatEvent and Event Ticketing Website

This is a web application for managing events and ticketing, built using React for the frontend and Flask for the backend.

## Overview

The application allows users to browse events, and their merchandise and purchase tickets for various events. It includes features such as user authentication, event creation, ticket purchasing, and more.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Flask: A lightweight web framework for Python.
- SQLite: A relational database management system used for data storage.
- Stripe Payment: Stripe development tools


## `Installing dependencies` Example


```python
cd backend
pipenv install
pipenv shell
python seed.py
python app.py
```

```python
cd client
npm install
```

## `Add your secret key at .env file in backend folder:
```python
#.env
SECRET_KEY = 'your_secret_key'
```

## `User can signup as a user or organizer`
User's are able to set their own role, if they will be user they can not create an event 
<img width="1676" alt="Screenshot 2024-06-07 at 2 34 54 PM" src="https://github.com/Nadiroglu/event-website-project/assets/150474907/fee83b97-198e-4ca5-a5a6-a273b7f25976">


## `Logging in as an Organizer`
When you log in as organizer you will be able to create a new event add merchandise to event or modify that event as well as browsing other organizer's events
<img width="1722" alt="Screenshot 2024-06-07 at 1 58 52 PM" src="https://github.com/Nadiroglu/event-website-project/assets/150474907/a457a53d-1086-455a-9ed6-fb0464567cb5">

## User Authentication 
Since The password or username is not correct there will be "VALIDATION"
<img width="1705" alt="Screenshot 2024-06-07 at 2 06 52 PM" src="https://github.com/Nadiroglu/event-website-project/assets/150474907/1f89dcda-1e6a-4e32-88a9-8760413602e5">


#USER HOME PAGE
User Can Brows Events and there details only when they are logged in 
<img width="1727" alt="Screenshot 2024-06-07 at 2 07 06 PM" src="https://github.com/Nadiroglu/event-website-project/assets/150474907/ea6bc568-f8c7-4b11-87fe-4cb9376c49b9">

#ORGANIZER HOME PAGE
Organizer's will have their own landing page since they are the only user who can create and manage events
<img width="1406" alt="Screenshot 2024-06-07 at 2 21 04 PM" src="https://github.com/Nadiroglu/event-website-project/assets/150474907/1b23686f-611e-43fb-9e75-39bbf6ff6e3f">

#EVENT DETAILS 
Each Event will have its specific merchandise and Tickets
<img width="471" alt="Screenshot 2024-06-07 at 2 02 56 PM" src="https://github.com/Nadiroglu/event-website-project/assets/150474907/abed3c4a-4a3e-4e4f-8b7f-950fc8cd1957">

#TICKET PAYMENT
Utilized by Modern Stripe Payment 
<img width="1388" alt="Screenshot 2024-06-07 at 2 03 07 PM" src="https://github.com/Nadiroglu/event-website-project/assets/150474907/d5592d0d-6bfd-4275-b77a-45e90a7ba92e">

#CREATING A NEW EVENT
Organizers are able to create a new event and add its merchandise and tickets
<img width="1438" alt="Screenshot 2024-06-07 at 2 08 41 PM" src="https://github.com/Nadiroglu/event-website-project/assets/150474907/8c8d0479-7e97-4834-892d-b97f6ab5a129">


Feature Goal: [Live Streams, Live Messaging]
Description
[I would like to learn new technologies such as websocket or socketio in order to make a live messaging and stream system for users. ]





