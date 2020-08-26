import React from 'react';
import { Link } from 'react-router-dom';

const StockIndexItem = ({ stock }) => {
  let percentChangeClass
  if (stock.percentChange < 0) {
    percentChangeClass = "percent-change-red";
  } else if (stock.percentChange > 0) {
    percentChangeClass = "percent-change-green";
  } else {
    percentChangeClass = "percent-change-black";
  }
  return (
    <Link to={`/assets/${stock.ticker.toLowerCase()}`}>
      <li className="stock-index-item">
        <div>
          <span className="ticker-name">{stock.ticker}</span>
          <span className="number-shares">{`${stock.quantity} shares`}</span>
        </div>
        <div>
          <span className="recent-price">
            ${(stock.recentPrice / 100).toFixed(2).toLocaleString()}
          </span>
          <span className={percentChangeClass}>{`${stock.percentChange}%`}</span>
        </div>
      </li>
    </Link>
  );
}

export default StockIndexItem;