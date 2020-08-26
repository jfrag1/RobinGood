import { connect } from 'react-redux';
import { clearErrors } from '../../../actions/session_actions';
import {
  requestUnwatch,
  buyAsset,
  sellAsset,
  buyNewAsset,
  createNewHolding,
} from '../../../actions/asset_actions';
import Sidebar from './sidebar';

const mSTP = (state, ownProps) => ({
  owned: state.entities.ownedAssets[ownProps.asset.ticker],
  watched: state.entities.watchedAssets[ownProps.asset.ticker],
  user: state.session.currentUser,
  errors: state.errors.purchase,
  asset: ownProps.asset,
});

const mDTP = (dispatch, ownProps) => ({
  unwatchAsset: (holdingId) => dispatch(requestUnwatch(holdingId)),
  watchAsset: (userId) =>
    dispatch(createNewHolding(ownProps.asset.id, userId, 0)),
  buyAsset: (userId, holdingId, oldQuant, quantBuying) =>
    dispatch(buyAsset(userId, holdingId, oldQuant, quantBuying, ownProps.asset.recentPrice)),
  buyNewAsset: (userId, quantity) =>
    dispatch(buyNewAsset(userId, ownProps.asset.id, quantity, ownProps.asset.recentPrice)),
  sellAsset: (userId, holdingId, oldQuant, quantSelling) =>
    dispatch(sellAsset(userId, holdingId, oldQuant, quantSelling, ownProps.asset.recentPrice)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mSTP, mDTP)(Sidebar);