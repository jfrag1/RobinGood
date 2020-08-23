import { RECEIVE_PURCHASE_ERRORS } from '../actions/asset_actions';

const purchaseErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PURCHASE_ERRORS:
      return Object.assign([], action.errors);
    default:
      return state;
  }
}

export default purchaseErrorsReducer;