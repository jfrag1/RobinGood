import React from 'react';
import SearchDropdown from './search_dropdown';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="nav-bar">
        <Link to="/portfolio"><h1 id="title-link">RobinGood</h1></Link>
        <SearchDropdown />
        <nav>
          <span className="nav-child">{this.props.user.username}</span>
          <button className="nav-child" onClick={this.props.logout}>Log Out</button>
        </nav>
      </section>
    );
  }
}

export default NavBar;