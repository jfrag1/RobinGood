import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {
  sendNewAssetPrice,
  requestUnwatch,
  updateQuantity,
  createNewHolding
} from './actions/asset_actions';
import { logoutUser } from './actions/session_actions'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let preloadedState = undefined;
  if (window.currentUser) {
    preloadedState = {
      session: {
        currentUser: window.currentUser
      }
    };
  }
  const store = configureStore(preloadedState);
  delete window.currentUser;
  //TESTING
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.logoutUser = logoutUser;
  window.sendNewAssetPrice = sendNewAssetPrice;
  window.requestUnwatch = requestUnwatch;
  window.updateQuantity = updateQuantity;
  window.createNewHolding = createNewHolding;
  //TESTING

  ReactDOM.render(<Root store={store}/>, root);
});