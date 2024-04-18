import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'
import NavBar from './NavBar';

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password_hash: '',
    first_name: '',
    last_name: '',
    profile_picture_url: '',
    role: 'User' // Default role is 'User'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to sign up');
        }
        return response.json();
      })
      .then(data => {
        console.log('User signed up successfully:', data);
        navigate('/')
        // Reset form data after successful signup
        setFormData({
          username: '',
          email: '',
          password_hash: '',
          first_name: '',
          last_name: '',
          profile_picture_url: '',
          role: 'User'
        });
      })
      .catch(error => {
        console.error('Error signing up:', error.message);
      });
  };

  return (
    <>
    <NavBar />
    <form className="signup-container" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password_hash"
          value={formData.password_hash}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Profile Picture URL:
        <input
          type="text"
          name="profile_picture_url"
          value={formData.profile_picture_url}
          onChange={handleChange}
        />
      </label>
      <label>
        Role:
        <select name='role' value={formData.role} onChange={handleChange} required>
          <option value='User'>User</option>
          <option value='Organizer'>Organizer</option>
        </select>
      </label>

      <button type="submit">Sign Up</button>
    </form>
    </>
  );
};

export default Signup;
