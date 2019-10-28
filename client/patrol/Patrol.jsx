import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import isNil from 'lodash/isNil';
import clone from 'lodash/clone';

import {listen} from '../services/listen';
import {NEW, ASSIGN, UNASSIGN, COMPLETE, assignCall,
  getActiveCalls, unassignMe, completeCall} from '../services/ServerCalls';
import CallList from './CallList';

import { makeStyles } from '@material-ui/core/styles';
const styles = makeStyles({
  dispatchContainer: {
    height: 'calc(100% - 48px)',
    position: 'relative',
    width: '100%'
  }
});

const Patrol = ({location, history, user}) => {

  const classes = styles();

  const [calls, setCalls] = useState([]);
  const [listener, setListener] = useState(null);

  const callsChanged = () => {
    getData();
  };

  useEffect(() => {
    const wss = new WebSocket('ws://localhost:8000/ws');
    console.log('connecting');

    wss.onconnection = () => {
      console.log('connected');
    };

    wss.onmessage = (msg) => {
      const jM = JSON.parse(msg.data);

      if (jM.action === NEW) {
        say(`New call.  Code ${jM.call.code}.  ${jM.call.title}. ${jM.call.address}`);
        callsChanged();
        return;
      }

      if (jM.action === ASSIGN ) {
        say(`Call ${jM.call.callId} assigned to ${jM.call.assignee}`);
        callsChanged();
        return;
      }

      if (jM.action === UNASSIGN) {
        say(`Call ${jM.call.callId} has been unassigned`);
        callsChanged();
        return;
      }

      if (jM.action === COMPLETE) {

        say(`Call ${jM.call.callId} has been completed.`);
        callsChanged();

        return
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

  useEffect(() => {
    if (!isNil(listener)) {
      console.log('stopping listener to restart');
      listener.shutdown();
    }

    const newListener = listen(handleSpeech);
    setListener(newListener);

    return () => {
      console.log('Shutting down');
      newListener.shutdown();
    };
  }, [calls]);

  const getData = async () => {
    const calls = await getActiveCalls();
    setCalls(calls.calls);
  }

  const say = (phrase) => {
    const spk = new SpeechSynthesisUtterance(phrase);
    speechSynthesis.speak(spk);
  }

  const findMyAssignment = () => {
    return calls.find((c) => {
      return c.assignee === user.username;
    });
  }

  const assignToMe = async () => {
    try {
      const alreadyAssigned = findMyAssignment();

      if (!isNil(alreadyAssigned)) {
        say(`You cannot be assigned to more than one call.  You are currently assigned to ${alreadyAssigned.callId}`);
        return;
      }

      await assignCall(calls[0], user.username);
    }
    catch(e) {
      say('Assignment failed.');
    }
  }

  const assignCallToMe = async (id) => {
    const alreadyAssigned = findMyAssignment();

    if (!isNil(alreadyAssigned)) {
      say(`You cannot be assigned to more than one call.  You are currently assigned to ${alreadyAssigned.callId}`);
      return;
    }

    const call = calls.find((c) => {
      return c.callId === id;
    });

    if (isNil(call)) {
      say(`No call with I D ${id}.`);
      return;
    }

    try {
      await assignCall(call, user.username);
    }
    catch(e) {
      say(`Assignment failed.`);
      return;
    }
  }

  const unassignMyCall = async () => {
    const call = findMyAssignment();

    if (isNil(call)) {
      say('You have no current assignments');
      return;
    }

    try {
      await unassignMe(call);
    }
    catch(e) {
      say('Unassign failed.');
    }
  }

  const readCalls = () => {
    calls.filter((c) => {
      return isNil(c.assignee);
    })
    .forEach((c2) => {
      say(`Call ${c2.callId}. Code ${c2.code}.  ${c2.title}. ${c2.address}.`)
    });
  }

  const completeMyCall = async () => {
    const call = findMyAssignment();

    if (isNil(call)) {
      say('You have no current assignments');
      return;
    }

    await completeCall(call);
  }

  const handleSpeech = async (phrase) => {
    console.log(`I heard: ${phrase}`);
    if (phrase === 'assign to me' || phrase === 'assigned to me') {
      assignToMe();
    }
    else if (phrase === 'read calls' || phrase === 'recalls') {
      readCalls();
    }
    else if (phrase.startsWith('assign') && phrase.endsWith('to me')) {
      const id = phrase.split(' ')[1];
      assignCallToMe(id);
    }
    else if (phrase.indexOf('unassign') !== -1) {
      unassignMyCall();
    }
    else if (phrase === 'complete call') {
      completeMyCall();
    }
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
