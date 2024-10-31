import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Traveler',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error when user types
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const { username, password, confirmPassword, role } = formData;

    // Simple validation
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Mock registration success
    alert(`User registered as ${role}`);
    
    // Call onSignup to set user in App and redirect to home page
    onSignup({ username, role });
    navigate('/');
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSignUp}>
        <h1 className="appTitle">RideShare</h1>

        <h3 className="signupTitle">Sign Up</h3>

        {error && <p className="error">{error}</p>} {/* Error message */}

        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="input"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className="input"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="Traveler">Traveler</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered? <a href="/login">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
