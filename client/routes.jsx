import React from 'react';
import App from './src/App';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Logout from './src/components/Logout';
import Signup from './src/components/Signup';
import EventDetails from './src/components/EventDetails';
import CheckProv from './src/components/CheckProv';
import EventForm from './src/components/EventForm';
import MerchForm from './src/components/MerchForm';
import OrganizerEvents from './src/components/OrganizerEvents';
// import Merchandise from './src/components/Merchandise';

// Load Stripe.js with your publishable key


const router = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/events/:id',
        element: <EventDetails />
      },
      {
        path: '/payment',
        element: <CheckProv />
      },
      {
        path: '/newevent',
        element: <EventForm />
      },
      {
        path: '/newmerch',
        element: <MerchForm />
      },
      {
        path: '/setorganizer',
        element: <OrganizerEvents />
      }
    ]
  }
];

export default router;
