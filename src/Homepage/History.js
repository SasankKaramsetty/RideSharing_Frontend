import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css';

const History = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) {
        setError("Please log in to view your trip history.");
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:8081/api/trips/viewAllTrips',
          { username: user.username },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setTrips(response.data.data.trips);
        } else {
          setError(response.data.message || "No trips found for this user.");
        }
      } catch (error) {
        setError("Failed to retrieve trips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="history-page">
      <h2>Your Trip History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : trips.length === 0 ? (
        <p>No trips found for this user.</p>
      ) : (
        <div className="trip-cards-container">
          {trips.map((trip, index) => (
            <div key={index} className="trip-card">
              <h3>Trip #{index + 1}</h3>
              <p>
                <strong>Status:</strong>
                <span className={trip.status === 'active' ? 'status-active' : 'status-completed'}>
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </span>
              </p>
              <p><strong>OTP:</strong> {trip.tripOTP}</p>
              <p>
                <strong>Trip Link:</strong> 
                <a 
                  href={`http://localhost:3000/trip/${trip.tripId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  http://localhost:3000/trip/{trip.tripId}
                </a>
              </p>
              <p><strong>Driver Name:</strong> {trip.driverName}</p>
              <p><strong>Driver Phone:</strong> {trip.driverPhoneNumber}</p>
              <p><strong>Cab Number:</strong> {trip.cabNumber}</p>
              <p><strong>Source:</strong> {`${trip.sourceLatitude}, ${trip.sourceLongitude}`}</p>
              <p><strong>Destination:</strong> {`${trip.destinationLatitude}, ${trip.destinationLongitude}`}</p>
              <p><strong>Travel Companions:</strong></p>
              <ul>
                {trip.tripURL && trip.tripURL.length > 0 ? (
                  trip.tripURL.map((companion, idx) => (
                    <li key={idx}>{companion}</li>
                  ))
                ) : (
                  <li>No companions</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
