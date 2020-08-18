import React from 'react';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import { Route, Switch } from 'react-router-dom';

const App = (props) => (
  <div>
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/signup" component={SignupContainer} />
      <Route path="/" component={NavBarContainer} />
    </Switch>
    <Route exact path="/" render={() => <h1 className="home-placeholder">This is the home page placeholder</h1>} />
    <Route exact path="/portfolio" render={() => <h1 className="portfolio-placeholder">This is the portfolio placeholder</h1>} />
  </div>
);

export default App;