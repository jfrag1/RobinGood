import React from 'react';
import WatchListContainer from './watch_list_container';
import StockIndexContainer from './stock_index_container';

const Sidebar = (props) => {
  return (
    <section className="portfolio-sidebar">
      <StockIndexContainer />
      <WatchListContainer />
    </section>
  );
}

export default Sidebar;