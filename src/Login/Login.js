import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        isTraveler: true, 
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setError(''); 
    };

    const validateForm = () => {
        const { username, password } = formData;

        if (!username || !password) {
            return 'Username and Password are required';
        }

        if (username.length < 3) {
            return 'Username must be at least 3 characters long';
        }

        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            return 'Username should contain only alphanumeric characters';
        }

        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }

        return '';
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const errorMsg = validateForm();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        try {
            console.log("Sending login request...");

            const response = await axios.post('http://localhost:8081/api/auth/login', {
                username: formData.username,
                password: formData.password,
                isTraveler: formData.isTraveler,
            });

            console.log("Login successful, full response:", response);
            
            const token = response.data; 
            if (!token) {
                console.error("Token not found in response. Check server response format.");
                setError("Login failed. Please check your username and password.");
                return;
            }

            console.log("Login successful, received token:", token);
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ username: formData.username, role: formData.isTraveler ? 'Traveler' : 'Admin' }));
            console.log("Token and user role saved in localStorage.");

            onLogin({ username: formData.username, role: formData.isTraveler ? 'Traveler' : 'Admin' });
            navigate('/');
        } catch (err) {
            console.error("Error during login:", err);
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleLogin}>
                <h1 className="appTitle">RideShare</h1>
                <h3 className="appTitle">Login</h3>

                {error && <p className="error">{error}</p>} 

                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Enter username"
                        name="username"
                        id="username"
                        onChange={handleInputChange}
                        value={formData.username}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="Enter password"
                        name="password"
                        id="password"
                        onChange={handleInputChange}
                        value={formData.password}
                    />
                </div>

                <div className="mb-3">
                    <label>User Role:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="isTraveler"
                                value="true"
                                checked={formData.isTraveler}
                                onChange={() => setFormData({ ...formData, isTraveler: true })}
                            />
                            Traveler
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="isTraveler"
                                value="false"
                                checked={!formData.isTraveler}
                                onChange={() => setFormData({ ...formData, isTraveler: false })}
                            />
                            Admin
                        </label>
                    </div>
                </div>

                <div className="d-grid buttonContainer">
                    <button type="submit" className="btn btn-primary button">
                        Login
                    </button>
                </div>
                <p className="forgotPassword text-right">
                    Not a user? Create one <a className="forgotPasswordLink" href="/signup">sign up?</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
