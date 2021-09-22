import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    margin: 0,
    marginTop: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '90vh',
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const LoginRegister = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <LoginForm onLoginSubmit={({}) => {}} />
      <RegisterForm />
    </div>
  );
};

export default LoginRegister;
