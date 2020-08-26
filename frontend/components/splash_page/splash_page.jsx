import React from 'react';
import LoggedOutNavBar from '../nav_bar/logged_out_nav_bar';
import { Link } from 'react-router-dom';

const SplashPage = (props) => {
  return (
    <main>
      <LoggedOutNavBar />
      <div className="splash-container">
        <div className="buffer" />
        <section className="splash-section-1">
          <div className="section-1-text">
            <header>Invest Your Way</header>
            <div className="subtext">
              At RobinGood, we work to give you the tools you need to build your future.
            </div>
            <Link
              id="splash-signup-link"
              className="nav-child" 
              to="/signup"><span>Sign Up</span></Link>
            <div className="filler" />
          </div>
          <div className="section-1-image" />
        </section>

      </div>
    </main>
  );
}

export default SplashPage;