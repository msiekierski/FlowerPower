import { Button, makeStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import CustomInputField from '../LoginForm/CustomInputField';

type Props = {
  onFormSubmit: (values: ChangePasswordFormValues) => void;
};

type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  formFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      '& .MuiButton-root': {
        width: '100%',
      },
    },
  },
}));

const ChangePasswordForm: React.FC<Props> = ({ onFormSubmit }) => {
  const classes = useStyles();

  const initialValues: ChangePasswordFormValues = {
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required').min(5, 'Min. 5 characters'),
    repeatNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords do not match'
    ),
  });

  return (
    <div className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onFormSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ touched, errors }) => (
          <Form>
            <Field
              name="oldPassword"
              label="Current password"
              type="password"
              component={CustomInputField}
              error={touched.oldPassword && errors.oldPassword}
              helperText={touched.oldPassword && errors.oldPassword}
            />
            <Field
              name="newPassword"
              label="New password"
              component={CustomInputField}
              error={touched.newPassword && errors.newPassword}
              helperText={touched.newPassword && errors.newPassword}
            />
            <Field
              name="repeatNewPassword"
              label="Repeat new password"
              component={CustomInputField}
              error={touched.repeatNewPassword && errors.repeatNewPassword}
              helperText={touched.repeatNewPassword && errors.repeatNewPassword}
            />
            <div className={classes.formFooter}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                type="submit"
              >
                Change Password
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
