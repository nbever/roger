import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RTextField from '../widgets/RTextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {addCall} from '../services/ServerCalls';
import { makeStyles } from '@material-ui/core/styles';

const CODES = [
  {id: '001', desc: 'Fashion violation'},
  {id: '002', desc: 'Dinosaur based hate crime'},
  {id: '1413', desc: 'Hippie Cruelty'},
  {id: '20', desc: 'Rib overrun'}
];

const styles = makeStyles({
  parent: {
    margin: '12px',
    padding: '8px',
    overflow: 'hidden',
    height: 'calc(100% - 40px)',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    backgroundColor: 'white'
  },
  list: {
    flexGrow: '1',
    flexShrink: '1',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  buttons: {
    display: 'flex',
    textAlign: 'center'
  },
  root: {
    color: 'black'
  }
});

const CallEntry = () => {

  const classes = styles();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('001');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const submitCall = async () => {
    const call = {
      title,
      code: `${code}`,
      address,
      description
    };

    await addCall(call);
    clearAll();
  };

  const clearAll = () => {
    setTitle('');
    setCode('');
    setDescription('');
    setAddress('');
  };

  const setState = (stateSetter) => {
    return ($e) => {
      stateSetter($e.target.value);
    };
  };

  const menus = CODES.map((code) => {
    return (
      <MenuItem value={code.id} key={code.id}>
        {code.desc}
      </MenuItem>
    );
  });

  return (
    <Paper className={classes.parent}>
      <Typography variant="h5">
        New Call
      </Typography>
      <div className={classes.list}>
          <div>
            <Select value={code} onChange={setState(setCode)}
              className={classes.root}
              inputProps={{
                style: {
                  color: 'black'
                }
              }}
              autoWidth={true}
            >
              {menus}
            </Select>
          </div>
          <RTextField onChange={setState(setTitle)} value={title} label="Tag line" color="secondary"/>
          <RTextField onChange={setState(setAddress)} value={address} label="Address" color="secondary"/>
          <RTextField onChange={setState(setDescription)} value={description} label="Description" multiline/>
      </div>
      <div className={classes.buttons}>
        <Button onClick={clearAll} color="secondary">
          Clear All
        </Button>
        <Button onClick={submitCall} color="primary"
          disabled={code === '' || title === '' || description === '' || address === ''}
        >
          Submit Call
        </Button>
      </div>
    </Paper>
  );
};

export default CallEntry;
