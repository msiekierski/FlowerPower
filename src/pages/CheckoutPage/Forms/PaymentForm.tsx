import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as Yup from 'yup';
import { ErrorMessage, Field, Formik, FormikProps } from 'formik';
import { Box, FormHelperText } from '@material-ui/core';
import Button from '@mui/material/Button';
import { useAuth } from '../../../utils/customHooks/useAuth';
import { Roles } from '../../../common/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root-reducer';
import { steps } from '../CheckoutPage';

const validateSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  cardNumber: Yup.string().required('Required'),
  cvvNumber: Yup.string().required('Required'),
  expiryDate: Yup.string()
    .required('Required')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Wrong format'),
});

export interface PaymentFormValues {
  name: string;
  cardNumber: string;
  cvvNumber: string;
  expiryDate: string;
}

type Props = {
  payment: PaymentFormValues | null;

  handleBack: () => void;
  handleNext: () => void;
  setPayment: (values: PaymentFormValues) => void;
};

const PaymentForm: React.FC<Props> = ({
  handleBack,
  handleNext,
  payment,
  setPayment,
}) => {
  const isLogged = useAuth() !== Roles.NONE;
  const formikRef = React.useRef<FormikProps<PaymentFormValues>>(null);

  const { user } = useSelector((root: RootState) => root.user);

  const onDataLoadClick = () => {
    if (formikRef && user?.creditCard) {
      const { values } = formikRef.current!;
      formikRef.current!.setValues(
        {
          ...formikRef.current!.values,
          name: user.creditCard.nameSurname
            ? user.creditCard.nameSurname
            : values.name,
          cvvNumber: user.creditCard.cvvNumber
            ? user.creditCard.cvvNumber
            : values.cvvNumber,
          expiryDate: user.creditCard.expiryDate
            ? user.creditCard.expiryDate
            : values.expiryDate,
          cardNumber: user.creditCard.cardNumber
            ? user.creditCard.cardNumber
            : values.cardNumber,
        },
        true
      );
    }
  };

  return (
    <>
      <Formik
        validationSchema={validateSchema}
        onSubmit={() => {}}
        initialValues={{
          name: payment?.name ? payment.name : '',
          cardNumber: payment?.cardNumber ? payment.cardNumber : '',
          cvvNumber: payment?.cvvNumber ? payment.cvvNumber : '',
          expiryDate: payment?.expiryDate ? payment.expiryDate : '',
        }}
        innerRef={formikRef}
      >
        {({ errors, touched, values }) => (
          <form>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>

            <Grid container spacing={3}>
              {isLogged && (
                <Grid item xs={12}>
                  <Button variant="contained" onClick={() => onDataLoadClick()}>
                    Load data saved on your account
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <Field name={'name'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        error={errors.name && touched.name}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'name'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field name={'cardNumber'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        error={errors.cardNumber && touched.cardNumber}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'cardNumber'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field name={'expiryDate'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="Expiry date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        error={errors.expiryDate && touched.expiryDate}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'expiryDate'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field name={'cvvNumber'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        error={errors.cvvNumber && touched.cvvNumber}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'cvvNumber'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
            </Grid>
            <React.Fragment>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    if (Object.keys(errors).length === 0) {
                      setPayment(values);
                      handleNext();
                    }
                  }}
                  disabled={
                    Object.keys(errors).length > 0 ||
                    Object.values(values).findIndex((str) => str === '') >= 0
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              </Box>
            </React.Fragment>
          </form>
        )}
      </Formik>
    </>
  );
};

export default PaymentForm;
