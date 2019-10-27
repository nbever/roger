import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import isNil from 'lodash/isNil';

import {getActiveCalls} from '../services/ServerCalls';

import CallList from './CallList';
import CallEntry from './CallEntry';

import { makeStyles } from '@material-ui/core/styles';
const styles = makeStyles({
  dispatchContainer: {
    display: 'flex',
    height: 'calc(100% - 48px)',
    position: 'relative'
  }
});

const Dispatch = ({location, history, user}) => {

  const classes = styles();

  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const wss = new WebSocket('ws://localhost:8000/ws');
    console.log('connecting');

    wss.onconnection = () => {
      console.log('connected');
    };

    wss.onmessage = (msg) => {
      getData();
    };

    return () => {
      console.log('Closing web socket...');
      wss.close();
    }
  }, []);

  useEffect(() => {
    const func = async () => {
      await getData();
    };

    func();
  }, []);

  useEffect(() => {
    if (isNil(location) || isNil(user)) {
      history.push('/login');
      return;
    }
  }, [location]);

  const getData = async () => {
    const calls = await getActiveCalls();
    setCalls(calls.calls);
  }

  return (
    <div className={classes.dispatchContainer}>
      <CallList calls={calls} />
      <CallEntry />
    </div>
  );
};

Dispatch.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object
};

export default withRouter(Dispatch);
