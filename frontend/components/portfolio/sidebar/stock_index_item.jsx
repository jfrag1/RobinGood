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

  const sharesText = stock.quantity === 1 ? "share" : "shares";

  return (
    <Link to={`/assets/${stock.ticker.toLowerCase()}`}>
      <li className="stock-index-item">
        <div>
          <span className="ticker-name">{stock.ticker}</span>
          <span className="number-shares">{`${stock.quantity} ${sharesText}`}</span>
        </div>
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

export default StockIndexItem;