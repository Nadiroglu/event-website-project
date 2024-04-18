import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

const Logout = () => {

  const navigate = useNavigate()

  const [isLogOut, setIsLogOut] = useState(false)

  useEffect(() => {
    fetch('api/logout', {
      method: 'DELETE',
      credentials: 'include'
    })
    .then((resp) => {
      if (resp.ok) {
        setIsLogOut(true)
        console.log(resp);
        navigate('/')
      } else {
        setIsLogOut(false)
      }

    })
  }, [])

  return (
    <>
    <NavBar />
    <p>{isLogOut ? "See you soon in our events.." : "Try again"}</p>
    
    </>
  )
}

export default Logout