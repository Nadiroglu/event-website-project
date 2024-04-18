import React, { useState } from 'react'
// import { Navbar } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import NavBar from './NavBar'


const OrganizerEvents = () => {
    const { user } = useOutletContext()

    const [formData, setFormData] = useState({
      organizer_id: 0,
      event_id: 0
    })

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({
        ...formData, [name]: value
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()

      fetch('/api/organizer', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then((r) => {
        if (!r.ok) {
            throw new Error('Failed to set organizer')
        }
        return r.json()
    })
    .then((d) => {
        console.log('Organizer has been set to event', d);
        setFormData({
            organizer_id: 0,
            event_id: 0
        })
    })
    .catch(err => {
        console.log('Error creating merch', err.message);
    })
    }



  return (
    <>
    <NavBar/>
    <div className="formContainer">
      <h2 className="formTitle">Set Organizer</h2>
      <form onSubmit={handleSubmit}>

        <label className="inputLabel">
          Organizer Id:
          <input type="text" name="organizer_id" value={formData.organizer_id} onChange={handleChange} className="inputField" />
        </label>
        <label className="inputLabel">
          Event ID:
          <input type="number" name="event_id" value={formData.event_id} onChange={handleChange} className="inputField" required />
        </label>
        <button type="submit" className="button">Set Organizer</button>
      </form>
    </div>
    </>
  )
}

export default OrganizerEvents