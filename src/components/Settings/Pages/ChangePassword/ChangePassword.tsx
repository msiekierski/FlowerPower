import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ChangePasswordForm from '../../../ChangePasswordForm/ChangePasswordForm';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '3%',
  },
}));

const ChangePassword = () => {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h4" className={classes.title}>Change Password</Typography>
      <ChangePasswordForm onFormSubmit={() => {}} />;
    </>
  );
};

export default ChangePassword;
