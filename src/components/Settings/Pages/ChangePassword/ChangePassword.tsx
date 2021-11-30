import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ChangePasswordForm from '../../../ChangePasswordForm/ChangePasswordForm';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root-reducer';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '3%',
  },
}));

const apiUrl = `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/reset/password`;

const ChangePassword = () => {
  const classes = useStyles();
  const { user } = useSelector((root: RootState) => root.user);
  const history = useHistory();
  return (
    <>
      <ChangePasswordForm
        onFormSubmit={(values) => {
          axios.put(apiUrl, {
            personId: user?.id,
            password: values.newPassword,
          });
          history.push('/settings/Personal Data');
        }}
      />
    </>
  );
};

export default ChangePassword;
