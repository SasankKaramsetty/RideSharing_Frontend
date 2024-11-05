import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    isTraveler: true,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); 
  };

  const handleRoleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      isTraveler: e.target.value === 'true',
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { username, password, confirmPassword } = formData;

    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role: formData.isTraveler ? 'Traveler' : 'Admin',
        }),
      });

      if (response.ok) {
        alert('Account created successfully!');
        onSignup({ username, role: formData.isTraveler ? 'Traveler' : 'Admin' });
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSignUp}>
        <h1 className="appTitle">RideShare</h1>

        <h3 className="signupTitle">Sign Up</h3>

        {error && <p className="error">{error}</p>} 

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
          <label>User Role:</label>
          <div>
            <label>
              <input
                type="radio"
                name="isTraveler"
                value="true"
                checked={formData.isTraveler}
                onChange={handleRoleChange}
              />
              Traveler
            </label>
            <label>
              <input
                type="radio"
                name="isTraveler"
                value="false"
                checked={!formData.isTraveler}
                onChange={handleRoleChange}
              />
              Admin
            </label>
          </div>
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
