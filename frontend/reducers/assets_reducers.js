import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

export const watchedAssetsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      let nextState = {};
      Object.values(action.res.assets).forEach((asset) => {
        if (!asset.quantity) {
          nextState[asset.id] = asset;
          delete nextState[asset.id].quantity;
        }
      });
      return nextState;
    default:
      return state;
  }
}

export const ownedAssetsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      let nextState = {};
      Object.values(action.res.assets).forEach((asset) => {
        if (asset.quantity) {
          nextState[asset.id] = asset;
        }
      });
      return nextState;
    default:
      return state;
  }
}