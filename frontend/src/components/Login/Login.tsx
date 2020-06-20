import React, { useState, useContext } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import axios from 'axios';

import { connection as ConnectionContext } from '../../contexts/socket';
import { setUser } from '../../actions/socket';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      margin: 'auto',
      width: '100%',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
    },

    formControl: {
      minWidth: '200px',
      maxWidth: '60%',
    },

    select: {
      marginTop: theme.spacing(1),
    },

    textField: {
      marginTop: theme.spacing(1),
    },

    button: {
      marginTop: theme.spacing(1),
    },
  });
});

interface Props {
  onLogInSucess: (data: any) => void;
}

export const Login: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const connectionContext = useContext(ConnectionContext);

  const handleUserNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setPassword(e.target.value);
  };

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post('/login', { username, password })
      .then((result) => {
        console.log('result.data', result.data);
        console.log('connection in here', connectionContext);
        connectionContext?.dispatch(setUser(result.data.alias)); //FIXME: issue setting username
        props.onLogInSucess(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl}>
          <TextField
            label={'Username'}
            onChange={handleUserNameChange}
            className={classes.textField}
          />
          <TextField
            type='password'
            label={'Password'}
            onChange={handlePasswordChange}
            className={classes.textField}
          />
          <Button type="submit" className={classes.button}>
            Login
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
