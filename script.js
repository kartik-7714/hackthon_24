import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming you have a backend API set up to handle authentication
const API_URL = 'http://your-api-url.com';

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            // Validate token with backend
            axios.get(`${API_URL}/validate-token`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    if (response.data.valid) {
                        setMessage('Already logged in');
                    }
                })
                .catch(error => {
                    console.error('Error validating token:', error);
                });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            if (isLogin) {
                // Login
                const response = await axios.post(`${API_URL}/login`, { username, password });
                localStorage.setItem('token', response.data.token);
                setMessage('Login successful');
            } else {
                // Signup
                const response = await axios.post(`${API_URL}/signup`, { username, password });
                setMessage('Signup successful. Please login.');
                setIsLogin(true);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }

        setUsername('');
        setPassword('');
    };

    return (
        <div className="App">
            <h1>{isLogin ? 'Login' : 'Signup'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need to create an account?' : 'Already have an account?'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;
