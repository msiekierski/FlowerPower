import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { IoIosReturnLeft } from 'react-icons/io';
import { ApiCallState } from '../../common/types';
import { Alert } from '@material-ui/lab';

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
  errorMessage: {
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    border: '2px solid green',
    color: 'inherit',
    maxWidth: '60%',
    margin: 'auto',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      maxWidth: '80%',
    },
  },
  footer: {
    marginTop: '20px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down(625)]: {
      flexDirection: 'column',
      rowGap: '10px',
    },
  },
}));

const RegisterPage = () => {
  const classes = useStyles();
  const [apiStatus, setApiStatus] = useState<ApiCallState>(ApiCallState.IDLE);

  const history = useHistory();

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.iconItem} onClick={() => history.goBack()}>
          <IoIosReturnLeft style={{ fontSize: '2rem' }} />
          <Typography className={classes.iconLabel}>RETURN</Typography>
        </div>
        {apiStatus === ApiCallState.FETCH_SUCCESS ? (
          <>
            <Alert
              severity="success"
              variant="filled"
              className={classes.errorMessage}
            >
              <Typography>
                Your account has been successfully created. Activate your
                account by clicking an activation link sent to your email.
              </Typography>
              <Typography>
                <b>Note: </b>
              </Typography>
              <Typography>
                If you've registered as legal person, you may need to wait until
                your account will be verified and activated by our staff.
              </Typography>
            </Alert>
            <div className={classes.footer}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push('/login')}
              >
                Back to login page
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push('/')}
              >
                Back to main page
              </Button>
            </div>
          </>
        ) : (
          <>
            <Typography
              variant="h3"
              style={{ marginBottom: '20px' }}
              align="center"
            >
              Register
            </Typography>
            <RegisterForm apiStatus={apiStatus} setApiStatus={setApiStatus} />
          </>
        )}
      </div>
    </>
  );
};

export default RegisterPage;
