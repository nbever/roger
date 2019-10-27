import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import isNil from 'lodash/isNil';

import {NEW, getActiveCalls} from '../services/ServerCalls';
import CallList from './CallList';

import { makeStyles } from '@material-ui/core/styles';
const styles = makeStyles({
  dispatchContainer: {
    display: 'flex',
    height: 'calc(100% - 48px)',
    position: 'relative',
    width: '100%'
  }
});

const Patrol = ({location, history, user}) => {

  const classes = styles();

  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const wss = new WebSocket('ws://localhost:8000/ws');
    console.log('connecting');

    wss.onconnection = () => {
      console.log('connected');
    };

    wss.onmessage = (msg) => {
      const jM = JSON.parse(msg.data);

      if (jM.action === NEW) {
        const spk = new SpeechSynthesisUtterance(`New call.  Code ${jM.call.code}.  ${jM.call.title}. ${jM.call.address}`);
        speechSynthesis.speak(spk);

        calls.splice(0, 0, jM.call);
        setCalls(calls);

        return;
      }
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
    </div>
  );
};

Patrol.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object
};

export default withRouter(Patrol);
