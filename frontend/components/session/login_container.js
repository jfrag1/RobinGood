import { connect } from 'react-redux';
import { loginUser } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = (state) => ({
  formType: "Log In"
});

const mDTP = (dispatch) => ({
  action: (user) => dispatch(loginUser(user))
});

export default connect(mSTP, mDTP)(SessionForm);