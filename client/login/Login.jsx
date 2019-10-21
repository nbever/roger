import React, {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import SPD from '../assets/SPD.png';

const styles = makeStyles({
  container: {
    textAlign: 'center',
    paddingTop: '30px'
  },

  fields: {
    padding: '24px'
  }
});

const Login = () => {

  const classes = styles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={classes.container}>
      <div>

      </div>
      <div className={classes.fields}>
        <div>
          <TextField
            value={username}
            label="Username"
            onChange={($e) => {
              setUsername($e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            label="Password"
            onChange={($e) => {
              setPassword($e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <Button variant="contained" color="primary">Login</Button>
      </div>
    </div>
  );
};

export default Login;
