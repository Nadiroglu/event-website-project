import React from 'react'
import EventCard from './EventCard'

const EventList = ({events, user}) => {
  console.log(events);
  return (
    <div>
      
      {events.map(event => (
        <EventCard
            user = {user}
            key = {event.id}
            id={event.id}
            img = {event.image_url}
            price = {event.ticket_price}
            location = {event.location}
            date = {event.date_time}
            category= {event.category}
            title = {event.title}
            description = {event.description}
            merchandise = {event.merchandise}
            tickets = {event.tickets}

            />))}
    </div>
  )
}

export default EventList