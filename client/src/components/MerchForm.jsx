import React, { useState } from 'react'
import NavBar from './NavBar'
import './merchform.css'


const MerchForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        image_url: '',
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

        fetch('/api/merch', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error('Failed to create a merch')
            }
            return r.json()
        })
        .then((d) => {
            console.log('Merch has been created successfully', d);
            setFormData({
                name: '',
                description: '',
                price: 0,
                image_url: '',
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
      <h2 className="formTitle">Create Merchandise</h2>
      <form onSubmit={handleSubmit}>
        <label className="inputLabel">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="inputField" required />
        </label>
        <label className="inputLabel">
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} className="inputField" required />
        </label>
        <label className="inputLabel">
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="inputField" required />
        </label>
        <label className="inputLabel">
          Image URL:
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="inputField" />
        </label>
        <label className="inputLabel">
          Event ID:
          <input type="number" name="event_id" value={formData.event_id} onChange={handleChange} className="inputField" required />
        </label>
        <button type="submit" className="button">Create Merch</button>
      </form>
    </div>
    </>
  )
}

export default MerchForm