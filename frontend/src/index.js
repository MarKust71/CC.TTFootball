import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import AppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import Home from './Views/Homepage';
import Login from './Views/Login';

const App = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Home} />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
