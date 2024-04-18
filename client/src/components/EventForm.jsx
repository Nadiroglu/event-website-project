import React, { useState } from 'react'
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import './eventform.css'
import NavBar from './NavBar'


const EventForm = () => {

    const { user } = useOutletContext()
    const navigate = useNavigate()
    // console.log(user)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date_time: '',
        ticket_price: '',
        stream_url: '',
        category: '',
        image_url: '',
        organizer_id: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch('/api/events', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create an event');
            }
            return response.json();
            })
            .then(data => {
            console.log('Created successfully:', data);
            // navigate('/')
            // Reset form data after successful signup
            setFormData({
                title: '',
                description: '',
                location: '',
                date_time: '',
                ticket_price: '',
                stream_url: '',
                category: '',
                image_url: '',
                organizer_id: ''
            });
            })
            .catch(error => {
            console.error('Error signing up:', error.message);
            });
        };

  return (
    <>
    <NavBar />
    <div className="formContainer">
      <h2 className="formTitle">Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <label className="inputLabel">
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="inputField" required />
        </label>
        <label className="inputLabel">
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} className="inputField" required />
        </label>
        <label className="inputLabel">
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="inputField" required />
        </label>
        <label className="inputLabel">
          Date:
          <input type="date" step="1" name="date_time" value={formData.date_time} onChange={handleChange} className="inputField" required />
        </label>
        <label className="inputLabel">
          Ticket Price:
          <input type="number" name="ticket_price" value={formData.ticket_price} onChange={handleChange} className="inputField" required />
        </label>
        <label className="inputLabel">
          Stream URL:
          <input type="text" name="stream_url" value={formData.stream_url} onChange={handleChange} className="inputField" />
        </label>
        <label className="inputLabel">
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="inputField" />
        </label>
        <label className="inputLabel">
          Image URL:
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="inputField" />
        </label>
        <label className="inputLabel">
          Organizer ID:
          <input type="number" name="organizer_id" value={formData.organizer_id} onChange={handleChange} className="inputField" required />
        </label>
        <button type="submit" className="button">Create Event</button>
        <NavLink to='/newmerch' className="button"><button>Add Merch</button></NavLink>
      </form>
    </div>
    </>
  )
}

export default EventForm