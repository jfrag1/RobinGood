import React from 'react';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import Portfolio from './portfolio/portfolio';
import { ExactProtectedRoute, ExactAuthRoute } from '../util/route_utils';
import { Route, Switch } from 'react-router-dom';

const App = (props) => (
  <div className="app-root">
    <Switch>
      <ExactAuthRoute path="/login" component={LoginContainer} />
      <ExactAuthRoute path="/signup" component={SignupContainer} />
      <Route path="/" component={NavBarContainer} />
    </Switch>
    <ExactAuthRoute path="/" component={() => <h1 className="home-placeholder">This is the home page placeholder</h1>} />
    <ExactProtectedRoute path="/portfolio" component={Portfolio} />
  </div>
);

export default App;