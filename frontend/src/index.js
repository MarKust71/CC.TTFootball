import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import Store, { StoreProvider } from './Store';
import setHeaders from './utils/setHeaders';
import AppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import Home from './Views/Homepage';
import Login from './Views/Login';
import Teams from './Views/Teams';
import Leagues from './Views/Leagues';
import Schedule from './Views/Schedule';

const App = () => {
  const { changeStore } = useContext(Store);
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/login/me', setHeaders());
      const data = await response.json();

      changeStore('isLogged', true);
      changeStore('me', data);
    })();
  }, []);
  return (
    <BrowserRouter>
      <AppBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/Schedule" component={Schedule} />
        <PrivateRoute path="/Leagues" component={Leagues} />
        <PrivateRoute path="/Teams" component={Teams} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.querySelector('#root'),
);
