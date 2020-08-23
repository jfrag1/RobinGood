import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import {
  UPDATE_ASSET_PRICE,
  UNWATCH_ASSET,
  UPDATE_HOLDING,
  RECEIVE_NEW_ASSET
} from '../actions/asset_actions';

export const watchedAssetsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState = {};
      if (action.res.assets) {
        Object.values(action.res.assets).forEach((asset) => {
          if (!asset.quantity) {
            nextState[asset.id] = asset;
            delete nextState[asset.id].quantity;
          }
        });
      }
      return nextState;
    case LOGOUT_CURRENT_USER:
      return {};
    case UPDATE_ASSET_PRICE:
      if (nextState[action.asset.id]) {
        nextState[action.asset.id].recentPrice = action.asset.recentPrice;
        return nextState;
      } else {
        return state;
      }
    case UNWATCH_ASSET:
      delete nextState[action.assetId];
      return nextState;
    case UPDATE_HOLDING:
      if (action.asset.quantity) {
        delete nextState[action.asset.id];
      } else {
        nextState[action.asset.id] = action.asset;
        delete nextState[action.asset.id].quantity;
      }
      return nextState;
    case RECEIVE_NEW_ASSET:
      if (action.asset.quantity) {
        return state;
      } else {
        nextState[action.asset.id] = action.asset;
        delete nextState[action.asset.id].quantity;
        return nextState;
      }
    default:
      return state;
  }
}

export const ownedAssetsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState = {};
      if (action.res.assets) {
        Object.values(action.res.assets).forEach((asset) => {
          if (asset.quantity) {
            nextState[asset.id] = asset;
          }
        });
      }
      return nextState;
    case LOGOUT_CURRENT_USER:
      return {};
    case UPDATE_ASSET_PRICE:
      if (nextState[action.asset.id]) {
        nextState[action.asset.id].recentPrice = action.asset.recentPrice;
        return nextState;
      } else {
        return state;
      }
    case UPDATE_HOLDING:
      if (action.asset.quantity) {
        nextState[action.asset.id] = action.asset;
      } else {
        delete nextState[action.asset.id];
      }
      return nextState;
    case RECEIVE_NEW_ASSET:
      if (action.asset.quantity) {
        nextState[action.asset.id] = action.asset;
        return nextState;
      } else {
        return state;
      }
    default:
      return state;
  }
}