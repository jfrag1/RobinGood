import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutNavBar = (props) => (
  <section className="nav-bar">
    <h1>Robingood</h1>
    <nav>
      <Link id="login-link" className="nav-child" to="/login">Log In</Link>
      <Link id="signup-link" className="nav-child" to="/signup"><span>Sign Up</span></Link>
    </nav>
  </section>
);

export default LoggedOutNavBar;