import React, { useState } from 'react';
import './CreateTrip.css';

const CreateTrip = () => {
  const [tripDetails, setTripDetails] = useState({
    username: '',
    driverName: '',
    driverPhoneNumber: '',
    cabNumber: '',
    sourceLatitude: '',
    sourceLongitude: '',
    destinationLatitude: '',
    destinationLongitude: '',
  });

  const [otp, setOtp] = useState('');
  const [tripUrl, setTripUrl] = useState('');
  const [isTripCreated, setIsTripCreated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock backend response after form submission
    setIsTripCreated(true);
    setOtp("123456"); // Mock OTP
    setTripUrl("http://localhost:3000/mock-trip-url"); // Mock URL
    alert("Trip created successfully (mock)!");
  };

  return (
    <div>
      {!isTripCreated ? (
        <form className="create-trip-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Driver Name</label>
            <input type="text" name="driverName" value={tripDetails.driverName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Driver Phone Number</label>
            <input type="text" name="driverPhoneNumber" value={tripDetails.driverPhoneNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Cab Number</label>
            <input type="text" name="cabNumber" value={tripDetails.cabNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Source Latitude</label>
            <input type="number" name="sourceLatitude" value={tripDetails.sourceLatitude} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Source Longitude</label>
            <input type="number" name="sourceLongitude" value={tripDetails.sourceLongitude} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Destination Latitude</label>
            <input type="number" name="destinationLatitude" value={tripDetails.destinationLatitude} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Destination Longitude</label>
            <input type="number" name="destinationLongitude" value={tripDetails.destinationLongitude} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-btn">Create Trip</button>
        </form>
      ) : (
        <div className="trip-info">
          <h2>Trip Created Successfully!</h2>
          <p><strong>OTP:</strong> {otp}</p>
          <p><strong>Trip Link:</strong> <a href={tripUrl} target="_blank" rel="noopener noreferrer">{tripUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default CreateTrip;
