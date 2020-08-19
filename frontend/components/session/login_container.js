import { connect } from 'react-redux';
import { loginUser, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = (state) => ({
  formType: "Log In",
  errors: state.errors.session
});

const mDTP = (dispatch) => ({
  action: (user) => dispatch(loginUser(user)),
  clearErrors: () => dispatch(clearErrors()),
  guestLogin: () => dispatch(loginUser({ username: "Guest", password: "showmethemoney"}))
});

export default connect(mSTP, mDTP)(SessionForm);