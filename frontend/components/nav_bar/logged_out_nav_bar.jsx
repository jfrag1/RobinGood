import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faAngellist
} from '@fortawesome/free-brands-svg-icons'

const LoggedOutNavBar = (props) => (
  <section className="nav-bar">
    <h1>Robingood</h1>
    <nav>
      <div className="about-me-dropdown">
        <span className="about-me-dropdown-header">About Me</span>
        <div className="about-me-dropdown-content">
          <a target="_blank" href="https://jackfragassi.com">
            <FontAwesomeIcon icon={faUserCircle} />
          </a>
          <a target="_blank" href="https://github.com/jfrag1/RobinGood">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/jack-fragassi-a8413b1b4/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a target="_blank" href="https://angel.co/u/jack-fragassi">
            <FontAwesomeIcon icon={faAngellist} />
          </a>
        </div>
      </div>
      <Link id="login-link" className="nav-child" to="/login">Log In</Link>
      <Link id="signup-link" className="nav-child" to="/signup"><span>Sign Up</span></Link>
    </nav>
  </section>
);

export default LoggedOutNavBar;