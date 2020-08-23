import { connect } from 'react-redux';
import WatchList from './watch_list';

const mSTP = state => ({
  stocks: Object.values(state.entities.watchedAssets)
});

export default connect(mSTP)(WatchList);