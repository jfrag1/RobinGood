import { RECEIVE_NEWS } from '../actions/news_action';

function filterStories(news) {
  const englishStories = [];
  news.forEach((story) => {
    if (story.lang === 'en') {
      englishStories.push(story);
    }
  });
  return englishStories;
}

const newsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NEWS:
      const eng_news = filterStories(action.news);
      return eng_news.map(({ headline, datetime, image, source, url }) => (
        { headline, datetime, image, source, url }
      ));
    default:
      return state;
  }
}

export default newsReducer;