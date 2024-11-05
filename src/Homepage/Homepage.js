import React, { useEffect } from "react";
import CreateTrip from "./CreateTrip";
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import "../Navbar/nav.css";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("No token found. Redirecting to login.");
      navigate('/login');
    } else {
      console.log(token);
      console.log("Token found. Rendering HomePage.");
    }
  }, [navigate]);

  return (
    <div className="homepage-container flex flex-col h-screen">
      <section className="flex-1 flex items-center justify-center">
        <div className="container">
          <CreateTrip />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
