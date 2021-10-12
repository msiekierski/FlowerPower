import {
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import RegisterFormLegal from './RegisterFormLegal';
import RegisterFormNatural from './RegisterFormNatural';

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
}));

const RegisterForm = () => {
  const [formType, setFormType] = useState('natural');

  const classes = useStyles();
  return (
    <div className={classes.registerContainer}>
      <Typography variant="h5">Register</Typography>
      <FormControl>
        <FormLabel focused={false}>Register as</FormLabel>
        <RadioGroup
          row
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        >
          <FormControlLabel
            value="natural"
            control={<Radio />}
            label="Natural person"
          />
          <FormControlLabel
            value="legal"
            control={<Radio />}
            label="Legal person"
          />
        </RadioGroup>
        {formType === 'natural' ? (
          <RegisterFormNatural onRegisterNaturalSubmit={({}) => {}} />
        ) : (
          <RegisterFormLegal />
        )}
      </FormControl>
    </div>
  );
};

export default RegisterForm;
