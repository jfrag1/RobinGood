import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser)
});

const ExactAuth = ({ loggedIn, path, component: Component }) => (
  <Route
    exact path={path}
    render={props => (
      loggedIn ? <Redirect to="/portfolio" /> : <Component {...props} />
    )}
  />
);

const ExactProtected = ({ loggedIn, path, component: Component }) => (
  <Route
    exact path={path}
    render={props => (
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    )}
  />
);


const Auth = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn ? <Redirect to="/portfolio" /> : <Component {...props} />
    )}
  />
);

const Protected = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    )}
  />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const ExactAuthRoute = withRouter(connect(mapStateToProps)(ExactAuth));
export const ExactProtectedRoute = withRouter(connect(mapStateToProps)(ExactProtected));