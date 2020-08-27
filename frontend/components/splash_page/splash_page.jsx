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
              At Robingood, we work to give you the tools you need to build your future.
            </div>
            <Link
              id="splash-signup-link"
              className="nav-child" 
              to="/signup"><span>Sign Up</span></Link>
            <div className="filler" />
          </div>
          <div className="section-1-image" />
        </section>
        <section className="splash-section-2">
          <div className="section-2-header">
            100% Commission Free Trading
          </div>
          <div className="section-2-text">
            There are no commissions because all of the money used here at
            Robingood is <span>fake</span>. As a signup bonus, we grant you
            $10,000 of our fake money for <span>free</span> so that you can
            practice for the real thing.
          </div>
        </section>
        <div className="test"></div>

      </div>
    </main>
  );
}

export default SplashPage;