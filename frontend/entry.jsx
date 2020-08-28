import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './local_storage';

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

  ReactDOM.render(<Root store={store}/>, root);
});