import React from 'react';
import SearchDropdown from './search_dropdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignOutAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faAngellist
} from '@fortawesome/free-brands-svg-icons'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="nav-bar" id="logged-in-nav-bar">
        <Link to="/portfolio"><h1 id="title-link">RobinGood</h1></Link>
        <SearchDropdown />
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
        <div className="account-dropdown">
          <span className="account-dropdown-header">Account</span>
          <div className="account-dropdown-content">
            <header>{this.props.user.username}</header>
            <div className="balances">
              <div className="total-value">
                <div className="value">
                  ${((this.props.holdingsValue + this.props.buyingPower) / 100)
                    .toLocaleString('en', { minimumFractionDigits: 2 })}
                </div>
                <span>Portfolio Value</span>
              </div>
              <div className="account-buying-power">
                <div className="value">
                  ${(this.props.buyingPower / 100)
                    .toLocaleString('en', { minimumFractionDigits: 2 })}
                </div>
                <span>Buying Power</span>
              </div>
            </div>
            <div className="logout-button" onClick={this.props.logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default NavBar;