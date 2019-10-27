import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {PRIMARY} from './theme';

import SPD from './assets/SPD.png';

const styles = makeStyles({
  bannerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px',
    height: '48px',
    backgroundColor: 'white'
  },

  image: {
    backgroundImage: `url(${SPD})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '48px',
    width: '48px'
  },

  lgoutBox: {
    textAlign: 'right'
  },

  title: {
    fontSize: '22px'
  },
  name: {
    paddingRight: '8px'
  }
});

const Banner = ({user, logout}) => {

  const classes = styles();

  return (
    <div className={classes.bannerContainer}>
      <div className={classes.image} />
      <div className={classes.title}>Roger Call Manager</div>
      <div className={classes.logoutBox}>
        <div className={classes.name}>Hi, {user.username.toUpperCase()}</div>
        <div>
          <Button onClick={logout} color="primary">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func
};

export default Banner;
