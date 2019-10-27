import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import isNil from 'lodash/isNil';

const styles = makeStyles({
  container: {
    '&:hover': {
      backgroundColor: 'lightgray',
      cursor: 'pointer',
      color: 'black'
    },

    paddingBottom: '4px'
  },

  assigned: {
    display: 'flex'
  },

  topRow: {
    display: 'flex'
  },

  bottomRow: {
    transform: 'scale(0.8,0.8)'
  },

  padme: {
    paddingRight: '4px',
    paddingLeft: '4px'
  }
});

const SmallCall = ({call}) => {

  const classes = styles();

  const status = isNil(call.assignee) ?
    <div className={classes.open}>Unassigned</div>
    :
    <div className={classes.assigned}>
      <div>{call.assignee}</div>
      <div>{call.status}</div>
    </div>;

  const icon = isNil(call.assignee) ?
    <NewReleasesIcon color="error"/>
    :
    <AssignmentTurnedInIcon color="action"/>;

  return (
    <div className={classes.container}>
      <div className={classes.topRow}>
        {icon}
        <div>{call.callId}</div>
        <div className={classes.padme}>:</div>
        <div>{call.code}</div>
        <div className={classes.padme}>-</div>
        <div>{call.title}</div>
      </div>
      <div className={classes.bottomRow}>
        {status}
      </div>
    </div>
  );
};

SmallCall.propTypes = {
  call: PropTypes.object
};

export default SmallCall;
