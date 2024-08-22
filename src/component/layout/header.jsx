import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className='header'>
      <ul>
        <li>
          <NavLink to="/" className="nav_link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/user" className="nav_link">
            User
          </NavLink>
        </li>
        <li>
          <NavLink to="/books" className="nav_link">
            Books
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
