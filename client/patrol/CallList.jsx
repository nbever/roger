import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SmallCall from './SmallCall';

import { makeStyles } from '@material-ui/core/styles';
const styles = makeStyles({
  parent: {
    margin: '12px',
    padding: '8px',
    overflow: 'hidden',
    height: 'calc(100% - 40px)',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    flexGrow: '0',
    flexShrink: '0'
  },
  list: {
    flexGrow: '1',
    flexShrink: '1',
    overflow: 'auto'
  }
});

const CallList = ({calls}) => {

  const classes = styles();

  const smallCalls = calls.map((call, index) => {
    return <SmallCall call={call} key={index}/>;
  });

  return (
    <Paper className={classes.parent}>
      <Typography variant="h5" className={classes.title}>
        Active Calls
      </Typography>
      <div className={classes.list}>
        {smallCalls}
      </div>
    </Paper>
  );
};

CallList.propTypes = {
  calls: PropTypes.arrayOf(PropTypes.object)
};

export default CallList;
