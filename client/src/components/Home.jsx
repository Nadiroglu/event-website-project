import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './Home.css'; // Import CSS file for styling
import EventList from './EventList';
import { NavLink, useOutletContext } from 'react-router-dom';

const Homepage = () => {
    const { user } = useOutletContext();
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');

    const filteredEvents = events.filter((event) => {
        return (
            event.category.toLowerCase().includes(search.toLowerCase()) ||
            event.title.toLowerCase().includes(search.toLowerCase())
        );
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <NavBar search={search} setSearch={setSearch} user={user} />
            {user.role === 'User' && (
                <div className="container">
                    <h1>Welcome: {user.username && user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
                    <EventList events={filteredEvents} user={user} />
                </div>
            )}

            {user.role === 'Organizer' && (
                <div className="organizer-div">
                    <h1>Hey: {user.username && user.username.charAt(0).toUpperCase() + user.username.slice(1)}! What interesting event would you like to create today?</h1>
                    <NavLink to="/newevent">Create a new Event</NavLink>
                    <NavLink to="/setorganizer">Add organizer</NavLink>
                    <EventList events={filteredEvents} user={user} />
                    <div className="organizer-events"></div>
                </div>
            )}
        </>
    );
};

export default Homepage;
