import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import CustomInputField from '../LoginForm/CustomInputField';

interface Values {
  email: string;
  password: string;
  passwordRepeat: string;
  accepted: Array<String>;
}

const validateSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(5, 'Min. 5 characters'),
  passwordRepeat: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match'
  ),
});

interface Props {
  onRegisterNaturalSubmit: (values: Values) => void;
}

const useStyles = makeStyles((theme) => ({
  registerButton: {
    marginTop: '20px',
    width: '50%',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const RegisterFormNatural: React.FC<Props> = ({ onRegisterNaturalSubmit }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordRepeat: '',
        accepted: [],
      }}
      onSubmit={(values) => onRegisterNaturalSubmit(values)}
      validationSchema={validateSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="email"
            label="E-mail"
            component={CustomInputField}
            error={errors.email && touched.email}
            helperText={touched.email && errors.email}
          />
          <Field
            name="password"
            label="Password"
            component={CustomInputField}
            error={errors.password && touched.password}
            helperText={touched.password && errors.password}
          />
          <Field
            name="passwordRepeat"
            label="Repeat password"
            component={CustomInputField}
            error={errors.passwordRepeat && touched.passwordRepeat}
            helperText={touched.passwordRepeat && errors.passwordRepeat}
          />
          <div className={classes.footerContainer}>
            <Button
              className={classes.registerButton}
              variant="contained"
              type="submit"
              color="secondary"
            >
              Register
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterFormNatural;
