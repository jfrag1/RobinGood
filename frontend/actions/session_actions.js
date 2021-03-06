import * as APIUtil from '../util/session_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

const receiveCurrentUser = (res) => ({
  type: RECEIVE_CURRENT_USER,
  res
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const createUser = (formUser) => (dispatch) => (
  APIUtil.createUser(formUser)
    .then((res) => dispatch(receiveCurrentUser(res)))
    .then(() => dispatch(clearErrors()))
    .fail(({ responseJSON }) => dispatch(receiveErrors(responseJSON)))
);

export const loginUser = (formUser) => (dispatch) => (
  APIUtil.loginUser(formUser)
    .then((res) => dispatch(receiveCurrentUser(res)))
    .then(() => dispatch(clearErrors()))
    .fail(({ responseJSON }) => dispatch(receiveErrors(responseJSON)))
);

export const logoutUser = () => (dispatch) => (
  APIUtil.logoutUser()
    .then(() => dispatch(logoutCurrentUser()))
    .then(() => dispatch(clearErrors()))
);