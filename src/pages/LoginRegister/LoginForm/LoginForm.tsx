import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { Field, Form, Formik, yupToFormErrors } from 'formik';
import React from 'react';
import CustomInputField from './CustomInputField';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    display: 'flex',
    marginTop: '20vh',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logInButton: {
    marginTop: '20px',
    width: '50%',
  },
}));

interface Values {
  email: string;
  password: string;
}

interface Props {
  onLoginSubmit: (values: Values) => void;
}

const LoginForm: React.FC<Props> = ({ onLoginSubmit }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const classes = useStyles();
  return (
    <div className={classes.loginContainer}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          onLoginSubmit(values);
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Typography variant="h5">Log In</Typography>
            <Field
              name="email"
              label="Email"
              component={CustomInputField}
              error={errors.email && touched.email}
              helperText={touched.email && errors.email}
            />
            <Field
              name="password"
              label="Password"
              error={errors.password && touched.password}
              helperText={touched.password && errors.password}
              component={CustomInputField}
            />
            <span style={{ marginRight: 'auto' }}>
              <Typography style={{ color: 'blue' }}>
                Forgotten your password?
              </Typography>
            </span>
            <Button
              className={classes.logInButton}
              variant="contained"
              type="submit"
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
