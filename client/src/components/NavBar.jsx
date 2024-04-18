import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'


const NavBar = ({search, setSearch, msg, user}) => {
    const isLoggedIn = msg === 'Login successful' || msg === 'You are already logged in';

    // console.log(user);


  return (
    <nav>
        <NavLink to="/" className='logo'>
            <img src="./logo.png" alt='' />
        </NavLink>
        <div className='searchBar'>
                    <input type='text' className='search' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <ul>
        {isLoggedIn ? (
          <>
            {/* Display user profile picture and logout link */}
            {/* <li>
              <img
                src={user.profile_picture_url || '/default-profile-pic.png'} // Provide a default profile picture URL
                alt="Profile"
                className="profile-picture"
              />
            </li> */}
            <li>
              <NavLink to="/logout" className="logout_link">
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            {/* Display login and signup links */}
            <li>
              <NavLink to="/login" className="login_link">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="signup_link">
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar