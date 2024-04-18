import React from 'react';
import './eventcard.css'; // Import your custom CSS for styling
import { NavLink } from 'react-router-dom';

const EventCard = ({ id, img, price, location, date, category, title, gridColumn, user }) => {
  console.log(user);
  // Check if id is missing or invalid
  if (!id) {
    return <div>Error: Event ID not provided.</div>;
  }

  return (
    <div className="event-card" style={{ gridColumn: gridColumn }}>
      <div className="image-container">
        <img src={img} alt={title} />
      </div>
      <div className="details">
        <h3>{title}</h3>
        <p>{category}</p>
        <p>{location}</p>
        <p>{date}</p>
        <p className="price">${price}</p>
      </div>
      {user.username && (
      <NavLink to={`/events/${id}`} >Details</NavLink>
      )}
    </div>
  );
};



export default EventCard;
