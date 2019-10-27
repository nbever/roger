import React, {useState} from 'react';
import PropTypes from 'prop-types';

import isNil from 'lodash/isNil';

import RTextField from '../widgets/RTextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {PRIMARY} from '../theme';
import {login} from '../services/ServerCalls';

import SPD from '../assets/SPD.png';

const styles = makeStyles({
  container: {
    textAlign: 'center',
    paddingTop: '30px'
  },

  fields: {
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px'
  },

  imagePd: {
    backgroundImage: `url(${SPD})`,
    height: '200px',
    width: '100%',
    textAlign: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  },

  center: {
    textAlign: 'center'
  },

  fieldContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '12px',
    padding: '12px'
  },

  primary: {
    color: PRIMARY
  },

  error: {
    color: 'red',
    fontWeight: 'bolder'
  }
});

const Login = ({success}) => {

  const classes = styles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const myLogin = async () => {
    try {
      const result = await login(username, password);
      success(result);
    }
    catch(err) {
      setError('Login failed');
    }
  }

  const clearError = () => {
    setError(null);
  }

  return (
    <div className={classes.container}>
      <div className={classes.imagePd} />
      <div className={classes.fieldContainer}>
        <div className={classes.fields}>
          <div>
            <RTextField
              value={username}
              label="Username"
              className={classes.primary}
              onChange={($e) => {
                clearError();
                setUsername($e.target.value);
              }}
            />
          </div>
          <div>
            <RTextField
              type="password"
              value={password}
              label="Password"
              className={classes.primary}
              onChange={($e) => {
                clearError();
                setPassword($e.target.value);
              }}
            />
          </div>
          { !isNil(error) &&
            <div className={classes.error}>
              {error}
            </div>
          }
        </div>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={myLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

Login.propTypes = {
  success: PropTypes.func
};

export default Login;
