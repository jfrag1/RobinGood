import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user, logout }) => {
  const display = user ? (
    <nav>
      <span className="nav-child">{user.username}</span>
      <button className="nav-child" onClick={logout}>Log Out</button>
    </nav>
  ) : (
    <nav>
      <Link id="login-link" className="nav-child" to="/login">Log In</Link>
      <Link id="signup-link" className="nav-child" to="/signup"><span>Sign Up</span></Link>
    </nav>
  );

  return (
    <section className="nav-bar">
      <h1>RobinGood</h1>
      {display}
    </section>
  );
}

export default NavBar;