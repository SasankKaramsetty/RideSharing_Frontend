import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateTrip.css';
const CreateTrip = () => {
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState({
    driverName: '',
    driverPhoneNumber: '',
    cabNumber: '',
    sourceLatitude: '',
    sourceLongitude: '',
    destinationLatitude: '',
    destinationLongitude: '',
    travelerCompanions: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      alert("Please log in to create a trip.");
      navigate('/login');
      return;
    }
    const formattedTripDetails = { 
      ...tripDetails, 
      username: user.username, 
      travelerCompanions: tripDetails.travelerCompanions.split(',').map(comp => comp.trim()),
    };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8081/api/trips/createTrip', formattedTripDetails, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
           const otp = (response.data.data.otp);
     const tripUrl=(response.data.data.url); 
      const id = tripUrl.match(/\/(\d+)$/)?.[1];
      navigate(`/trip/update-coordinates/${id}`, { state: { otp, tripUrl } });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create a New Trip</h2>
      <form className="create-trip-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Driver Name:</label>
          <input
            type="text"
            name="driverName"
            value={tripDetails.driverName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Driver Phone Number:</label>
          <input
            type="text"
            name="driverPhoneNumber"
            value={tripDetails.driverPhoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Cab Number:</label>
          <input
            type="text"
            name="cabNumber"
            value={tripDetails.cabNumber}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Source Latitude:</label>
          <input
            type="number"
            name="sourceLatitude"
            value={tripDetails.sourceLatitude}
            onChange={handleChange}
            step="0.000001"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Source Longitude:</label>
          <input
            type="number"
            name="sourceLongitude"
            value={tripDetails.sourceLongitude}
            onChange={handleChange}
            step="0.000001"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Destination Latitude:</label>
          <input
            type="number"
            name="destinationLatitude"
            value={tripDetails.destinationLatitude}
            onChange={handleChange}
            step="0.000001"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Destination Longitude:</label>
          <input
            type="number"
            name="destinationLongitude"
            value={tripDetails.destinationLongitude}
            onChange={handleChange}
            step="0.000001"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Traveler Companions (comma-separated):</label>
          <input
            type="text"
            name="travelerCompanions"
            value={tripDetails.travelerCompanions}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creating Trip..." : "Create Trip"}
        </button>
        
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default CreateTrip;
