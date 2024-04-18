import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import './login.css'



const Login = () => {
    const [msg, setMsg] = useState('');
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [user, setUser] = useState(null); 
    const navigate = useNavigate();
    const { user } = useOutletContext();


    const handleLogin = async () => {
        const userInfo = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userInfo)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMsg('Login failed: ' + (errorData.error || 'Unauthorized'));
                setError('Invalid credentials');
            } else {
                const userData = await response.json();
                // console.log(userData);
                // setUser(userData.user); // Update the logged-in user state
                // setMsg('Login successful');
                // setError('');
                // console.log(`You are logged in as: ${userData.user.username}`);
                // navigate('/');
                if (userData.message === 'You are already logged in') {
                    setMsg('You are already logged in');
                    setError('You are already logged in');
                    // Optionally, perform navigation or other actions here
                } else {
                    // Update the logged-in user state with the user data
                    // setUser(userData.user);
                    setMsg('Login successful');
                    setError('');
                    console.log(`You are logged in as: ${user.username}`);
                    // navigate('/');
                }
            }
        } catch (error) {
            console.error('Login error:', error.message);
            setError('An error occurred during login');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Username and password are required');
            setMsg('');
            return;
        }

        await handleLogin();
    };

    // console.log(user);
    return (
        <div>
            <NavBar msg={msg}/>
            {/* {user ? ( */}
                <p>You are logged in as: {user.username}</p>
            {/* ) : ( */}
                <>
                    {msg && <p>{msg}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <h2>Beautif**ing Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                placeholder="Username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                placeholder="Password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <button type="submit">Login</button>
                    </form>
                </>
            {/* )} */}
        </div>
    );
};

export default Login;
