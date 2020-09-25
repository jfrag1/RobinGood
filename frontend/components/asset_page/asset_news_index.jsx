import React from 'react';
import { fetchCompanyNews } from '../../util/external_api_util';
import { Link } from 'react-router-dom';

class AssetNewsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { news: [] };
  }

  componentDidMount() {
    fetchCompanyNews(this.props.ticker)
      .then((news) => this.setState({ news: this.filterStories(news) }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.ticker !== prevProps.ticker) {
      fetchCompanyNews(this.props.ticker)
        .then((news) => this.setState({ news: this.filterStories(news) }));
    }
  }


  filterStories(news) {
    const englishStories = [];
    news.forEach((story) => {
      if (story.lang === 'en') {
        englishStories.push(story);
      }
    });
    return englishStories;
  }

  render() {
    return (
      <div className="asset-news-container">
        <h2>News</h2>
        <ul className="asset-news-index">
          {
            this.state.news.map((story) => (
              <a target="_blank" href={story.url} key={story.datetime}>
                <li className="asset-news-story">
                  <div>
                    <h4 className="asset-news-source">{story.source}</h4>
                    <span className="asset-news-headline">{story.headline}</span>
                  </div>
                  <img className="asset-news-img" src={story.image} />
                </li>
              </a>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default AssetNewsIndex;