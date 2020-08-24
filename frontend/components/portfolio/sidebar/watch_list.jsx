import React from 'react';
import WatchListItem from './watch_list_item';

const WatchList = ({ stocks }) => {
  const NoStocksMessage = stocks.length ? null :
    (<p className="no-stocks-msg">Interested in a stock but don't want to buy it? Add it to your Watchlist!</p>);
  return (
    <aside className="watch-list-container">
      <div className="sidebar-header-container">
        <header>Watchlist</header>
      </div>
      <ul className="watch-list">
        {
          stocks.map((stock) => (<WatchListItem key={stock.id} stock={stock} />))
        }
        { NoStocksMessage }
      </ul>
    </aside>
  );
}

export default WatchList;