import React from 'react';
import { Link } from 'react-router-dom';

const WatchListItem = ({ stock }) => {
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
        <span className="ticker-name">{stock.ticker}</span>
        <div>
          <span className="recent-price">
            ${(stock.recentPrice / 100).toLocaleString(
              'en',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}
          </span>
          <span className={percentChangeClass}>
            {`${Number(stock.percentChange).toFixed(2)}%`}
          </span>
        </div>
      </li>
    </Link>
  );
}

export default WatchListItem;