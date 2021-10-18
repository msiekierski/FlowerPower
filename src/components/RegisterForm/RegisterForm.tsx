import {
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import CustomInputField from '../LoginForm/CustomInputField';
import * as Yup from 'yup';
import { CheckboxWithLabel } from 'formik-material-ui';
import { string } from 'yup';

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
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

interface Values {
  email: string;
  password: string;
  passwordRepeat: string;
  nip: string;
  accepted: boolean;
}

const RegisterForm = () => {
  const [formType, setFormType] = useState('natural');

  const validateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Min. 5 characters'),
    passwordRepeat: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords do not match'
    ),
    nip: Yup.string().when(formType, {
      is: 'legal',
      then: string().required('Required'),
      otherwise: string(),
    }),
    accepted: Yup.bool()
      .oneOf([true], 'You must accept terms in order to register')
      .required('You must accept terms in order to register'),
  });

  const classes = useStyles();
  return (
    <div className={classes.registerContainer}>
      <FormControl>
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
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordRepeat: '',
            accepted: false,
            nip: '',
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
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
                type="password"
                component={CustomInputField}
                error={errors.password && touched.password}
                helperText={touched.password && errors.password}
              />
              <Field
                name="passwordRepeat"
                label="Repeat password"
                type="password"
                component={CustomInputField}
                error={errors.passwordRepeat && touched.passwordRepeat}
                helperText={touched.passwordRepeat && errors.passwordRepeat}
              />
              <Collapse in={formType === 'legal'}>
                <Field
                  required={formType === 'legal'}
                  name="nip"
                  label="NIP number"
                  component={CustomInputField}
                  error={errors.nip && touched.nip}
                  helperText={touched.nip && errors.nip}
                />
              </Collapse>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="accepted"
                Label={{ label: 'I accept terms of using the service' }}
                error={errors.accepted}
                helperText={true}
              />
              <FormHelperText style={{ color: 'red' }}>
                <ErrorMessage name="accepted" />
              </FormHelperText>
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
      </FormControl>
    </div>
  );
};

export default RegisterForm;
