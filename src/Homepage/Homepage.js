import React from "react";
import CreateTrip from "./CreateTrip";
import './Homepage.css';
import "../Navbar/nav.css";

const HomePage = () => {
  console.log("HomePage component re-rendered");

  return (
    <div className="homepage-container flex flex-col h-screen">
      <section className="flex-1 flex items-center justify-center">
        <div className="container">
          <h1 className="title text-3xl font-bold text-center mb-8">Create a Trip</h1>
          {/* Render CreateTrip component here */}
          <CreateTrip />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
