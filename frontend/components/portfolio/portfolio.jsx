import React from 'react';
import NewsIndexContainer from './news_index_container';
import Sidebar from './sidebar/sidebar';

const Portfolio = (props) => (
  <main>
    <div className="portfolio-container">
      <section className="portfolio-main">
        <NewsIndexContainer />
      </section>
      <Sidebar />
    </div>
  </main>
);

export default Portfolio;