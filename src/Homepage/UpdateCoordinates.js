import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateCoordinates = () => {
  const { state } = useLocation();
  const { tripId } = useParams();
  const { otp, tripUrl } = state || {};  
  
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdateCoordinates = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put('http://localhost:8081/api/trips/update-coordinates', {
        tripId,
        currentLatitude,
        currentLongitude,
        otp: inputOtp,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      setMessage("Trip completed successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update coordinates. Please try again.");
    }
  };

  return (
    <div className="update-coordinates">
      <h2>Trip Details</h2>
      <p><strong>Trip Link:</strong> <a href={tripUrl} target="_blank" rel="noopener noreferrer">{tripUrl}</a></p>
      <p><strong>OTP:</strong> {otp}</p>
      
      <h3>Complete the Trip</h3>
      <div className="form-group">
        <label>Current Latitude:</label>
        <input
          type="number"
          value={currentLatitude}
          onChange={(e) => setCurrentLatitude(e.target.value)}
          required
          step="0.000001"
        />
      </div>
      <div className="form-group">
        <label>Current Longitude:</label>
        <input
          type="number"
          value={currentLongitude}
          onChange={(e) => setCurrentLongitude(e.target.value)}
          required
          step="0.000001"
        />
      </div>
      <div className="form-group">
        <label>Enter OTP:</label>
        <input
          type="text"
          value={inputOtp}
          onChange={(e) => setInputOtp(e.target.value)}
          required
        />
      </div>
      <button onClick={handleUpdateCoordinates}>Complete Trip</button>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UpdateCoordinates;
