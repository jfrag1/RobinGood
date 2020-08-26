import React from 'react';
import assetSearch from '../../util/search_util';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', matchedAssets: null };
    this.wrapperRef = React.createRef();
    this.handleInput = this.handleInput.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleRedirect() {
    this.setState({ query: '', matchedAssets: null })
  }

  handleInput(e) {
    this.setState({ query: e.target.value });
    if (e.target.value === '') {
      this.setState({ matchedAssets: null })
    } else {
      assetSearch(e.target.value)
        .then((assets) => this.setState({ matchedAssets: assets }));
    }
  }

  handleClickOutside(e) {
    if (this.state.matchedAssets === null) return;
    if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
      this.setState({ matchedAssets: null });
    }
  }

  render() {
    let dropdown
    if (this.state.matchedAssets === null) {
      dropdown = null;
    } else if (this.state.matchedAssets.length === 0) {
      dropdown = (
        <div className="search-dropdown" id="no-results">
          We were unable to find any results for your search.
        </div>
      );
    } else {
      dropdown = (
        <div className="search-dropdown">
          <header>Stocks</header>
          <ul className="matched-assets">
            {
              this.state.matchedAssets.map((asset, idx) => (
                <Link to={`/assets/${asset.ticker.toLowerCase()}`} onClick={this.handleRedirect} key={idx}>
                  <li className="search-result">
                    <span>{asset.ticker}</span>
                    <span>{asset.name}</span>
                  </li>
                </Link>
              ))
            }
          </ul>
        </div>
      );  
    }
    return (
      <div className="search-bar" ref={this.wrapperRef}>
        <div className="input-container">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text"
            placeholder="Search"
            value={this.state.query}
            onChange={this.handleInput} />
        </div>
        {dropdown}
      </div>
    );
  }
}

export default SearchDropdown;