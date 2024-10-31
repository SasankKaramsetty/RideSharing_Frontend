// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './Login/Login';
// import Signup from './Signup/Signup';
// import HomePage from './Homepage/Homepage';
// import NavBar from './Navbar/Navbar';
// import { Navigate } from 'react-router-dom';
// const App = () => {
//   const [user, setUser] = useState(null);

//     const handleLogin = (loggedInUser) => {
//         setUser(loggedInUser);
//     };
//     const handleSignup = (userData) => {
//       setUser(userData);
//     };
//   return (
//     <Router>
//       <div className="App">
//       {user && window.location.pathname === '/' && <NavBar />}
//         <Routes>
//         <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />}/>
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route path="/signup" element={<Signup onSignup={handleSignup}/>}/>
//           {/* <Route */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import HomePage from './Homepage/Homepage';
import NavBar from './Navbar/Navbar';

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
