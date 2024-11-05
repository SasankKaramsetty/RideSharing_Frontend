import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import "./nav.css"
const NavBar = () => {
  return (
    <nav>
      <NavLink to="/" activeClassName="active-link">
        RideSharing
      </NavLink>
      <div>
      <NavLink to="/history" activeClassName="active-link">
          <FontAwesomeIcon icon={faHistory} /> 
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
