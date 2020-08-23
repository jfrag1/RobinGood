import React from 'react';
import { Link } from 'react-router-dom';

const StockIndexItem = ({ stock }) => {
  return (
    <Link to={`/assets/${stock.ticker.toLowerCase()}`}>
      <li className="stock-index-item">
        <div>
          <span className="ticker-name">{stock.ticker}</span>
          <span className="number-shares">{stock.quantity} shares</span>
        </div>
        <span className="recent-price">${(stock.recentPrice / 100).toLocaleString()}</span>
      </li>
    </Link>
  );
}

export default StockIndexItem;