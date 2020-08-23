import React from 'react';
import { Link } from 'react-router-dom';

const WatchListItem = ({ stock }) => {
  return (
    <Link to={`/assets/${stock.ticker.toLowerCase()}`}>
      <li className="watch-list-item">
        <span className="ticker-name">{stock.ticker}</span>
        <span className="recent-price">${(stock.recentPrice / 100).toLocaleString()}</span>
      </li>
    </Link>
  );
}

export default WatchListItem;