import newsReducer from './news_reducer';
import { combineReducers } from 'redux';

const entitiesReducer = combineReducers({
  news: newsReducer
});

export default entitiesReducer;