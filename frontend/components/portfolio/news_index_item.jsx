import React from 'react';

const NewsIndexItem = (props) => (
  <a target="_blank" className="news-index-item" href={props.story.url}>
    <div>
      <header>{props.story.source}</header>
      <section>
        <span>{props.story.headline}</span>
        <img className="news-img" src={props.story.image} />
      </section>
    </div>
  </a>
);

export default NewsIndexItem;