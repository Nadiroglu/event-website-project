import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './eventdetails.css';
import NavBar from './NavBar';
import Merchandise from './Merchandise';

const EventDetails = () => {
    const [showMerch, setShowMerch] = useState(false);
    const [isTicket, setIsTicket] = useState(false);
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`/api/events/${id}`)
            .then((res) => res.json())
            .then((data) => setEvent(data));
    }, [id]);

    if (!event) {
        return <p>Loading...</p>;
    }

    const handleTicket = () => {
        setIsTicket(!isTicket);
    };

    const handleHide = () => {
        setShowMerch(!showMerch);
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="image_url">
                    <img src={event.image_url} alt="" />
                </div>
                <div className="stream_url">
                    <a>Link stream</a>
                </div>
                <div className="description">
                    <h3>{event.description}</h3>
                </div>
                <div className="merch-button">
                    <button onClick={handleHide}>
                        {showMerch ? 'Hide' : 'Show Merch'}
                    </button>
                </div>

                <div className="organizer">
                    {event.organizer_events.map((o) => (
                        <h1 key={o.id}>Organizer: {o.organizer.username}</h1>
                    ))}
                </div>

                {showMerch && (
                    <div className="merch-container">
                        {event.merchandise.map((m) => (
                            <Merchandise
                                key={m.id}
                                name={m.name}
                                description={m.description}
                                price={m.price}
                                image_url={m.image_url}
                            />
                        ))}
                    </div>
                )}

                <button onClick={handleTicket}>Available Tickets</button>

                {isTicket && (
                    <div className="ticket-container">
                        <h3>Need to be buy until: {event.tickets[0].purchase_date}</h3>
                        <NavLink to={'/payment'}>
                            <h5>Buy Now</h5>
                        </NavLink>
                    </div>
                )}
            </div>
        </>
    );
};

export default EventDetails;
