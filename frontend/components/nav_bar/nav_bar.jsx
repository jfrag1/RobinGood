import React from 'react';
import SearchDropdown from './search_dropdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="nav-bar" id="logged-in-nav-bar">
        <Link to="/portfolio"><h1 id="title-link">RobinGood</h1></Link>
        <SearchDropdown />
        {/* <nav>
          <span className="nav-child">{this.props.user.username}</span>
          <button className="nav-child" onClick={this.props.logout}>Log Out</button>
        </nav> */}
        <div className="account-dropdown">
          <span className="account-dropdown-header">Account</span>
          <div className="account-dropdown-content">
            <header>{this.props.user.username}</header>
            <div className="balances">
              <div className="total-value">
                <div className="value">
                  ${((this.props.holdingsValue + this.props.user.buyingPower) / 100)
                    .toLocaleString('en', { minimumFractionDigits: 2 })}
                </div>
                <span>Portfolio Value</span>
              </div>
              <div className="account-buying-power">
                <div className="value">
                  ${(this.props.user.buyingPower / 100)
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