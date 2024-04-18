import React, { useState, useEffect } from 'react'
// import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';



const App = () => {
  

    const [user, setUser] = useState({});

    useEffect(() => {
      fetch(`/api/check_session`, {
        method:'GET',
        credentials: 'include'
      }).then((res) => {
        if (res.ok) {
          res.json().then((user) => setUser(user));
        }
      });
    }, []);

    return (
        <>
          <Outlet context={{user}} />
          <Footer/>
        </>
    );

}

export default App