import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(''); // Clear error message as user types
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

    const handleLogin = (e) => {
        e.preventDefault();

        const errorMsg = validateForm();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        // Mock login response for frontend testing
        const mockUser = { username: formData.username, role: 'Traveler' };
        localStorage.setItem('user', JSON.stringify(mockUser));
        onLogin(mockUser);
        navigate('/'); // Redirect to home after successful login
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleLogin}>
                <h1 className="appTitle">RideShare</h1>
                <h3 className="appTitle">Login</h3>

                {error && <p className="error">{error}</p>} {/* Display error message */}

                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="input" // Use your custom input class
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
                        className="input" // Use your custom input class
                        placeholder="Enter password"
                        name="password"
                        id="password"
                        onChange={handleInputChange}
                        value={formData.password}
                    />
                </div>

                <div className="d-grid buttonContainer">
                    <button type="submit" className="btn btn-primary button">
                        Login
                    </button>
                </div>
                <p className="forgotPassword text-right"> {/* Updated class name */}
                    Not a user? Create one <a className="forgotPasswordLink" href="/signup">sign up?</a> {/* Added link styling */}
                </p>
            </form>
        </div>
    );
};

export default Login;
