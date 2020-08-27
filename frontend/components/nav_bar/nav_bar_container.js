import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import NavBar from './nav_bar';
import assetSearch from '../../util/search_util';

const mSTP = state => {
  const owned = Object.values(state.entities.ownedAssets);
  let holdingsValue = 0;
  owned.forEach((asset) => holdingsValue += asset.quantity * asset.recentPrice);
  return {
    user: state.session.currentUser,
    holdingsValue
  };
};

const mDTP = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(mSTP, mDTP)(NavBar);