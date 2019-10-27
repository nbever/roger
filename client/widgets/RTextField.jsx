import React from 'react';
import TextField from '@material-ui/core/TextField';

const RTextField = (props) => {

  return (
    <TextField {...props}
      inputProps={{
        style: {
          color: 'black'
        }
      }}
    />
  );
};

export default RTextField;
