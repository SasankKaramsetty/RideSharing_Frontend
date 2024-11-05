import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import HomePage from './Homepage/Homepage';
import NavBar from './Navbar/Navbar';
import TripDetails from './Homepage/TripDetails';
import History from './Homepage/History';
import UpdateCoordinates from './Homepage/UpdateCoordinates';
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="App">
        {user && window.location.pathname === '/' && <NavBar />}
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/trip/:tripId" element={<TripDetails />} />
          <Route path="/trip/update-coordinates/:tripId" element={user?<UpdateCoordinates />:<Navigate to ="/login"/>} />
          <Route path='/history' element = {<History/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
