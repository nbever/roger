import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './login/Login';
import Dispatch from './dispatch/Dispatch';

import theme from './theme.js';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/dispatch" component={Dispatch} exact />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

const app = document.getElementById('app');
ReactDOM.render(new App(), app);
