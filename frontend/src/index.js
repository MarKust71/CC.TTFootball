import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import AppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import Home from './Views/Homepage';
import Login from './Views/Login';
import NewLeague from './Views/NewLeague';

const App = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/NewLeague" component={NewLeague} />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
