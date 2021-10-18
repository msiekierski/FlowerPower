import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { IoIosReturnLeft } from 'react-icons/io';

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
  iconItem: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    columnGap: '10px',
    cursor: 'pointer',
  },
  iconLabel: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
}));

const RegisterPage = () => {
  const classes = useStyles();

  const history = useHistory();

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.iconItem} onClick={() => history.goBack()}>
          <IoIosReturnLeft style={{ fontSize: '2rem' }} />
          <Typography className={classes.iconLabel}>RETURN</Typography>
        </div>
        <Typography
          variant="h3"
          style={{ marginBottom: '20px' }}
          align="center"
        >
          Register
        </Typography>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
