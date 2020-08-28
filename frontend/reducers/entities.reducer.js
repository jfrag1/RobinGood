import newsReducer from './news_reducer';
import { watchedAssetsReducer, ownedAssetsReducer } from './assets_reducers';
import { combineReducers } from 'redux';
import portfolioGraphReducer from './portfolio_graph_reducer';

const entitiesReducer = combineReducers({
  news: newsReducer,
  watchedAssets: watchedAssetsReducer,
  ownedAssets: ownedAssetsReducer,
  portfolioGraph: portfolioGraphReducer
});

export default entitiesReducer;