import React from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon}></i> {title}
        </Link>
      </h1>
      <ul>
        <li>
          <NavLink exact activeStyle={{ textDecoration: "underline" }} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeStyle={{ textDecoration: "underline" }}
            to="/about"
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
