import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TripDetails.css';

const TripDetails = () => {
  const { tripId } = useParams(); 
  const navigate = useNavigate();
  const [tripData, setTripData] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [error, setError] = useState('');
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/trips/${tripId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        console.log("Trip data fetched:", response.data.data);
        setTripData(response.data.data); 
      } catch (err) {
        setError('This link has expired or is invalid.');
        setExpired(true);
      }
    };
    fetchTripDetails();
  }, [tripId]);

  
  if (expired) {
    return <p className="error-message">This trip link has expired.</p>;
  }

  return (
    <div className="trip-details">
      <h2>Trip Details</h2>
      {tripData ? (
        <div>
          <p><strong>Driver Name:</strong> {tripData.driverName}</p>
          <p><strong>Driver Phone Number:</strong> {tripData.driverPhoneNumber}</p>
          <p><strong>Cab Number:</strong> {tripData.cabNumber}</p>
          <p><strong>Source Coordinates:</strong> {tripData.sourceLatitude}, {tripData.sourceLongitude}</p>
          <p><strong>Destination Coordinates:</strong> {tripData.destinationLatitude}, {tripData.destinationLongitude}</p>
          <p><strong>Traveler Companions:</strong> {Array.isArray(tripData.travelerCompanions) ? tripData.travelerCompanions.join(', ') : 'No companions listed'}</p>
          <p><strong>OTP:</strong> {tripData.tripOTP}</p> 
          </div>
      ) : (
        <p>Loading trip data...</p>
      )}
    </div>
  );
};

export default TripDetails;
