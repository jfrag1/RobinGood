import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as AssetAPI from './util/asset_util';

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
  window.fetchAsset = AssetAPI.fetchAsset;
  window.updateAsset = AssetAPI.updateAsset;
  window.watchAsset = AssetAPI.watchAsset;
  window.buyNewAsset = AssetAPI.buyNewAsset;
  window.updateHolding = AssetAPI.updateHolding;
  window.deleteHolding = AssetAPI.deleteHolding;
  //TESTING

  ReactDOM.render(<Root store={store}/>, root);
});