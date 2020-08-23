import React from 'react';
import StockIndexItem from './stock_index_item';

const StockIndex = ({ stocks }) => {
  return (
    <aside className="stock-index-container">
      <header>Stocks</header>
      <ul className="stock-index">
        {
          stocks.map((stock) => (<StockIndexItem key={stock.id} stock={stock} />))
        }
      </ul>
    </aside>
  );
}

export default StockIndex;