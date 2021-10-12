import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { Field, Form, Formik, yupToFormErrors } from 'formik';
import React from 'react';
import CustomInputField from './CustomInputField';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
  logInButton: {
    marginTop: '30px',
    width: '70%',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      width: '100%',
    },
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
            <Typography
              variant="h3"
              style={{ marginBottom: '20px' }}
              align="center"
            >
              Log In
            </Typography>
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
            <span style={{ margin: 'auto' }}>
              <Typography style={{ color: 'blue' }} variant="h6">
                Forgotten your password?
              </Typography>
              <Link to="/register">
                <Typography style={{ color: 'blue' }} variant="h6">
                  Don't&nbsp;have&nbsp;an&nbsp;account?
                  Create&nbsp;one&nbsp;now!
                </Typography>
              </Link>
            </span>
            <div className={classes.footerContainer}>
              <Button
                className={classes.logInButton}
                variant="contained"
                type="submit"
                color="secondary"
              >
                Log In
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
