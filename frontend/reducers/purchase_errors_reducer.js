import { RECEIVE_PURCHASE_ERRORS } from '../actions/asset_actions';
import { CLEAR_ERRORS } from '../actions/session_actions';

const purchaseErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PURCHASE_ERRORS:
      return Object.assign([], action.errors);
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
}

export default purchaseErrorsReducer;