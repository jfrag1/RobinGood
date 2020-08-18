import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { createUser, loginUser, logoutUser } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();

  //TESTING
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.createUser = createUser;
  window.loginUser = loginUser;
  window.logoutUser = logoutUser;
  //TESTING

  ReactDOM.render(<h1>React works!</h1>, root);
});