import sessionErrorsReducer from './session_errors_reducer';
import { combineReducers } from 'redux';
import purchaseErrorsReducer from './purchase_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  purchase: purchaseErrorsReducer
});

export default errorsReducer;