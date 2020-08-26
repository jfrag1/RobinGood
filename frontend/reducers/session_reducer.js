import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_NEW_BUYING_POWER } from '../actions/asset_actions';

const _nullSession = { currentUser: null }

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, { currentUser: action.res.user });
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    case RECEIVE_NEW_BUYING_POWER:
      let nextState = Object.assign({}, state);
      nextState.currentUser.buyingPower = action.buyingPower;
      return nextState;
    default:
      return state;
  }
}

export default sessionReducer;