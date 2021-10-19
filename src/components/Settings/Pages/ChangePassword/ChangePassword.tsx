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
      <ChangePasswordForm onFormSubmit={() => {}} />;
    </>
  );
};

export default ChangePassword;
