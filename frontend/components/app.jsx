import React from 'react';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import LoggedOutNavBar from './nav_bar/logged_out_nav_bar';
import Portfolio from './portfolio/portfolio';
import AssetPage from './asset_page/asset_page';
import { ExactProtectedRoute, ExactAuthRoute, ProtectedRoute, AuthRoute } from '../util/route_utils';
import { Route, Switch } from 'react-router-dom';

const App = (props) => (
  <div className="app-root">
    <ProtectedRoute path={["/portfolio", "/assets/:ticker"]} component={NavBarContainer} />
    <Switch>
      <AuthRoute path="/login" component={LoginContainer} />
      <AuthRoute path="/signup" component={SignupContainer} />
      <ProtectedRoute path="/portfolio" component={Portfolio} />
      <ProtectedRoute path="/assets/:ticker" component={AssetPage} />
      <AuthRoute path="/" component={LoggedOutNavBar} />
    </Switch>
    {/* <ExactProtectedRoute path="/portfolio" component={Portfolio} /> */}
  </div>
);

export default App;