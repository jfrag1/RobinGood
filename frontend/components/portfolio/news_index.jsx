import React from 'react';
import NewsIndexItem from './news_index_item';

class NewsIndex extends React.Component {
  componentDidMount() {
    if (!this.props.stories.length) {
      this.props.requestNews();
    }
  }

  render() {
    return (
      <section className="news-index">
        <h2>News</h2>
        <ul>
          {
            this.props.stories.map((story, idx) => (
              <NewsIndexItem key={idx} story={story} />
            ))
          }
        </ul>
      </section>
    )
  }
}

export default NewsIndex;