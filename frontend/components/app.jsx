import React from 'react';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';
import { Route } from 'react-router-dom';

const App = (props) => (
  <div>
    <h1>hello from app</h1>
    <Route path="/login" component={LoginContainer} />
    <Route path="/signup" component={SignupContainer} />
  </div>
);

export default App;