import { connect } from 'react-redux'
import { createUser } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = (state) => ({
  formType: "Sign Up",
});

const mDTP = (dispatch) => ({
  action: (user) => dispatch(createUser(user))
});

export default connect(mSTP, mDTP)(SessionForm);