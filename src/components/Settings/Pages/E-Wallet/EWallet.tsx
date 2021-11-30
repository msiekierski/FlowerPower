import React, { ChangeEvent, FocusEvent, useState } from 'react';
import Cards from 'react-credit-cards';
import { ReactCreditCardProps } from 'react-credit-cards/index';
import 'react-credit-cards/es/styles-compiled.css';
import {
  TextField,
  makeStyles,
  Button,
  FormHelperText,
} from '@material-ui/core';
import * as Yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root-reducer';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  walletContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      flexDirection: 'column-reverse',
      rowGap: '20px',
    },
  },
  form: {
    width: '50%',
    rowGap: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export type Focused = 'name' | 'number' | 'expiry' | 'cvc';

interface FormValues {
  name: string;
  cardNumber: string;
  cvvNumber: string;
  expiryDate: string;
}

const validateSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  cardNumber: Yup.string().required('Required'),
  cvvNumber: Yup.string()
    .required('Required')
    .length(3, 'CVC is a 3 digit number'),
  expiryDate: Yup.string()
    .required('Required')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Wrong format'),
});

const getCreditCardApiUrl = (userId: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/create/creditCard/${userId}`;

const EWallet = () => {
  const classes = useStyles();
  const [cardData, setCardData] = useState<ReactCreditCardProps>({
    cvc: '',
    expiry: '',
    focused: 'number',
    name: '',
    number: '',
  });

  const { user } = useSelector((root: RootState) => root.user);

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let mapped = name;
    if (name === 'cardNumber') {
      mapped = 'number';
    }
    if (name === 'expiryDate') {
      mapped = 'expiry';
    }
    if (name === 'cvvNumber') {
      mapped = 'cvc';
    }
    setCardData({ ...cardData, focused: mapped as Focused });
  };

  return (
    <Formik
      validationSchema={validateSchema}
      onSubmit={() => {}}
      initialValues={{
        name: user?.creditCard?.nameSurname ? user.creditCard.nameSurname : '',
        cardNumber: user?.creditCard?.cardNumber
          ? user.creditCard.cardNumber
          : '',
        cvvNumber: user?.creditCard?.cvvNumber ? user.creditCard.cvvNumber : '',
        expiryDate: user?.creditCard?.expiryDate
          ? user.creditCard.expiryDate
          : '',
      }}
    >
      {({ errors, touched, values }) => (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await axios.post(getCreditCardApiUrl(user?.id!), {
                cardNumber: values.cardNumber,
                expirationDate: values.expiryDate,
                cvv2Number: values.cvvNumber,
                cardOwner: values.name,
              });
              user!.creditCard = {
                cardNumber: values.cardNumber,
                expiryDate: values.expiryDate,
                cvvNumber: values.cvvNumber,
                nameSurname: values.name,
              };
            } catch (e) {}
          }}
        >
          <div className={classes.walletContainer}>
            <div className={classes.form}>
              <Field name={'cardNumber'}>
                {({ field, form: { isSubmitting } }: any) => (
                  <>
                    <TextField
                      {...field}
                      required
                      fullWidth
                      variant="standard"
                      margin="none"
                      size="small"
                      color="secondary"
                      type="text"
                      inputProps={{ maxLength: 16 }}
                      placeholder="Card number"
                      onFocus={handleInputFocus}
                      error={errors.cardNumber && touched.cardNumber}
                    />
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name={'cardNumber'} />
                    </FormHelperText>
                  </>
                )}
              </Field>

              <Field name={'name'}>
                {({ field, form: { isSubmitting } }: any) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      variant="standard"
                      margin="none"
                      size="small"
                      color="secondary"
                      type="text"
                      placeholder="Name and surname"
                      onFocus={handleInputFocus}
                      required
                      error={errors.name && touched.name}
                    />
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name={'name'} />
                    </FormHelperText>
                  </>
                )}
              </Field>

              <Field name={'expiryDate'}>
                {({ field, form: { isSubmitting } }: any) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      variant="standard"
                      margin="none"
                      size="small"
                      color="secondary"
                      type="text"
                      placeholder="Expiration date"
                      helperText="MM/YY"
                      onFocus={handleInputFocus}
                      required
                      error={errors.expiryDate && touched.expiryDate}
                    />
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name={'expiryDate'} />
                    </FormHelperText>
                  </>
                )}
              </Field>

              <Field name={'cvvNumber'}>
                {({ field, form: { isSubmitting } }: any) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      variant="standard"
                      margin="none"
                      size="small"
                      color="secondary"
                      type="text"
                      inputProps={{ maxLength: 3 }}
                      placeholder="CVC"
                      onFocus={handleInputFocus}
                      required
                      error={errors.cvvNumber && touched.cvvNumber}
                    />
                    <FormHelperText style={{ color: 'red' }}>
                      <ErrorMessage name={'cvvNumber'} />
                    </FormHelperText>
                  </>
                )}
              </Field>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                type="submit"
                disabled={
                  Object.keys(errors).length > 0 ||
                  Object.values(values).findIndex((str) => str === '') >= 0
                }
              >
                Save
              </Button>
            </div>
            <Cards
              cvc={values.cvvNumber}
              expiry={values.expiryDate}
              focused={cardData.focused}
              name={values.name}
              number={values.cardNumber}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EWallet;
