import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import isLogged from '../../utils/isLogged';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (isLogged() ? <Component {...props} /> : <Redirect to="/login" />)} />
);

export default PrivateRoute;
