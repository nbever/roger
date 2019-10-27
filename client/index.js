import 'regenerator-runtime/runtime';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import isNil from 'lodash/isNil';

import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { withRouter } from 'react-router';

import Login from './login/Login';
import Dispatch from './patrol/Dispatch';
import Patrol from './patrol/Patrol';
import Banner from './Banner';

import {logout} from './services/ServerCalls';

import theme from './theme.js';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});

const BasicAppRouter = ({location, history}) => {

  const classes = styles();
  const [user, setUser] = useState(null);

  const loginSuccess = (authUser) => {
    const path = (authUser.type === 'officer' || authUser.type === 'vigilante') ?
      'patrol' : 'dispatch';
    setUser(authUser);
    history.push(`/${path}`);
  }

  const thisLogout = async () => {
    await logout();
    setUser(null);
    history.push('/login');
  }

  return (
    <div className={classes.mainContainer}>
      { !isNil(user) &&
        <Banner user={user} logout={thisLogout}/>
      }
      <Switch>
        <Route
          path="/login"
          render={() => {
            return <Login success={loginSuccess} />;
          }}
          exact
        />
        <Route
          path="/dispatch"
          render={() => {
            return <Dispatch user={user} />;
          }}
          exact
        />
        <Route
          path="/patrol"
          render={() => {
            return <Patrol user={user} />;
          }}
          exact
        />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

BasicAppRouter.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};

const AppRouter = withRouter(BasicAppRouter);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRouter />
      </Router>
    </ThemeProvider>
  );
};

const app = document.getElementById('app');
ReactDOM.render(new App(), app);
