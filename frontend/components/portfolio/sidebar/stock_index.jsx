import React from 'react';
import StockIndexItem from './stock_index_item';

const StockIndex = ({ stocks }) => {
  const NoStocksMessage = stocks.length ? null :
    (<p className="no-stocks-msg">Find some stocks to purchase!</p>);
  return (
    <aside className="stock-index-container">
      <div className="sidebar-header-container">
        <header>Stocks</header>
      </div>
      <ul className="stock-index">
        {
          stocks.map((stock) => (<StockIndexItem key={stock.id} stock={stock} />))
        }
        { NoStocksMessage }
      </ul>
    </aside>
  );
}

export default StockIndex;