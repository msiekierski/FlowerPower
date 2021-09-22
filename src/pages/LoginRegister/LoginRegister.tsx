import {
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/user';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    margin: 0,
    marginTop: '5%',
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

  const dispatch = useDispatch();
  const { logInUser } = bindActionCreators(actionCreators, dispatch);

  return (
    // <div className={classes.mainContainer}>
    //   <LoginForm onLoginSubmit={({}) => {}} />
    //   <RegisterForm />
    // </div>
    <Grid container justifyContent="center" className={classes.mainContainer}>
      <Grid item xs={6}>
        <LoginForm
          onLoginSubmit={({ email, password }) => {
            logInUser({ email, password });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <RegisterForm />
      </Grid>
    </Grid>
  );
};

export default LoginRegister;
