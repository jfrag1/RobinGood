import React from 'react';
import WatchListItem from './watch_list_item';
import StockIndexItem from './stock_index_item';

const WatchList = ({ stocks }) => {
  return (
    <aside className="watch-list-container">
      <header>Watchlist</header>
      <ul className="watch-list">
        {
          stocks.map((stock) => (<StockIndexItem key={stock.id} stock={stock} />))
        }
      </ul>
    </aside>
  );
}

export default WatchList;