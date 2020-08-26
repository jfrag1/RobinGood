import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import throttle from 'lodash/throttle';
import {
  sendNewAssetPrice,
  requestUnwatch,
  updateQuantity,
  createNewHolding
} from './actions/asset_actions';
import { logoutUser, clearErrors } from './actions/session_actions'
import { loadState, saveState } from './local_storage';
import { sendBuyingPowerChange, buyAsset, sellAsset } from './actions/asset_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let preloadedState = {};

  if (window.currentUser) {
    preloadedState.session = {};
    preloadedState.session.currentUser = window.currentUser;
  }
  const persistedState = loadState();
  if (persistedState) {
    preloadedState.entities = persistedState.entities;
    preloadedState.entities.news = [];
  }

  const store = configureStore(preloadedState);
  delete window.currentUser;

  store.subscribe(throttle(() => {
    saveState({
      entities: store.getState().entities
    });
  }, 1000));

  //TESTING
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.logoutUser = logoutUser;
  window.sendNewAssetPrice = sendNewAssetPrice;
  window.requestUnwatch = requestUnwatch;
  window.updateQuantity = updateQuantity;
  window.createNewHolding = createNewHolding;
  window.sendBuyingPowerChange = sendBuyingPowerChange;
  window.buyAsset = buyAsset;
  window.sellAsset = sellAsset;
  window.clearErrors = clearErrors;
  //TESTING

  ReactDOM.render(<Root store={store}/>, root);
});