import {
  Button,
  CircularProgress,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import CustomInputField from '../LoginForm/CustomInputField';
import * as Yup from 'yup';
import { CheckboxWithLabel } from 'formik-material-ui';
import { string } from 'yup';
import { ApiCallState, Roles } from '../../common/types';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

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
  errorMessage: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    border: '2px solid red',
    color: 'inherit',
  },
}));

interface Values {
  email: string;
  password: string;
  passwordRepeat: string;
  nip: string;
  accepted: boolean;
}

let validateSchema = Yup.object().shape({
  formType: Yup.string(),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(5, 'Min. 5 characters'),
  passwordRepeat: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match'
  ),
  nip: Yup.string(),
  accepted: Yup.bool()
    .oneOf([true], 'You must accept terms in order to register')
    .required('You must accept terms in order to register'),
});

const registerUrl =
  process.env.REACT_APP_API_ADDRESS + '/flowerPower/register/postCredential';

type Props = {
  apiStatus: ApiCallState;
  setApiStatus: (status: ApiCallState) => void;
};

const RegisterForm:React.FC<Props> = ({apiStatus, setApiStatus}) => {
  const [formType, setFormType] = useState('natural');
  const [errorMsg, setErrorMsg] = useState('');

  if (formType === 'legal') {
    validateSchema = Yup.object().shape({
      formType: Yup.string(),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(5, 'Min. 5 characters'),
      passwordRepeat: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords do not match'
      ),
      nip: Yup.string()
        .required('Required')
        .length(10, 'NIP must have 10 digits'),
      accepted: Yup.bool()
        .oneOf([true], 'You must accept terms in order to register')
        .required('You must accept terms in order to register'),
    });
  }

  const submitForm = async (values: Values) => {
    const { email, password, nip } = values;
    const requestBody = {
      email,
      password,
      nip,
      role: formType === 'natural' ? Roles.CLIENT : Roles.OWNER,
    };
    try {
      setApiStatus(ApiCallState.FETCH_BEGIN);
      const { data } = await axios.post(registerUrl, requestBody);
      setErrorMsg('');
      setApiStatus(ApiCallState.FETCH_SUCCESS);
    } catch (e) {
      setApiStatus(ApiCallState.FETCH_ERROR);
      setErrorMsg(e.response.data);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.registerContainer}>
      <FormControl>
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordRepeat: '',
            accepted: false,
            nip: '',
          }}
          onSubmit={(values) => {
            submitForm(values);
          }}
          validationSchema={validateSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <RadioGroup
                row
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
              >
                <FormControlLabel
                  name="formType"
                  value="natural"
                  control={<Radio />}
                  label="Natural person"
                />
                <FormControlLabel
                  name="formType"
                  value="legal"
                  control={<Radio />}
                  label="Legal person"
                />
              </RadioGroup>
              {errorMsg.length > 0 && (
                <Alert
                  severity="error"
                  variant="filled"
                  className={classes.errorMessage}
                >
                  <Typography>{errorMsg}</Typography>
                </Alert>
              )}
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
                  {apiStatus === ApiCallState.FETCH_BEGIN && (
                    <CircularProgress />
                  )}
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
