import newsReducer from './news_reducer';
import { watchedAssetsReducer, ownedAssetsReducer } from './assets_reducers';
import { combineReducers } from 'redux';

const entitiesReducer = combineReducers({
  news: newsReducer,
  watchedAssets: watchedAssetsReducer,
  ownedAssets: ownedAssetsReducer
});

export default entitiesReducer;