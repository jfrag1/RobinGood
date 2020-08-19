import { connect } from 'react-redux'
import { createUser, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = (state) => ({
  formType: "Sign Up",
  errors: state.errors.session
});

const mDTP = (dispatch) => ({
  action: (user) => dispatch(createUser(user)),
  clearErrors: () => dispatch(clearErrors()),
  guestLogin: () => dispatch(loginUser({ username: "Guest", password: "showmethemoney"}))
                      .then(() => this.props.history.push('/portfolio'))
});

export default connect(mSTP, mDTP)(SessionForm);