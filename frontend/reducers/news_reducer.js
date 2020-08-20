import { RECEIVE_NEWS } from '../actions/news_action';

const newsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NEWS:
      return action.news.map(({ headline, datetime, image, source, url }) => (
        { headline, datetime, image, source, url }
      ));
    default:
      return state;
  }
}

export default newsReducer;