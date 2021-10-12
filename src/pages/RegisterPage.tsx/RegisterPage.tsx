import { makeStyles } from '@material-ui/core';
import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

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

const RegisterPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
