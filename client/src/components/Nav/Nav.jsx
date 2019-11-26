import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = props => {
  return (
    <header>
      <nav className="nav">
        <ul className="nav__ul">
            <li className="nav__li nav__li--logo"><NavLink to="/">EventBooker</NavLink></li>
            <li><NavLink to="/events">Events</NavLink></li>
            <li><NavLink to="/bookings">Bookings</NavLink></li>
            <li><NavLink to="/auth">Login</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
