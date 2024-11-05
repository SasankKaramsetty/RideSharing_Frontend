import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./profile.css";

const UserProfile = ({ updateUser }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: '', role: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData({
        username: storedUser.username,
        role: storedUser.role,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    updateUser(null);
    navigate('/signup');
  };

  return (
    <div className="profile-container">
      {userData.username ? (
        <div className="profile-content">
          <h1>User Profile</h1>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserProfile;
