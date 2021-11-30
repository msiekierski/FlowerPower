import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MuiPhoneNumber from 'material-ui-phone-number';
import * as Yup from 'yup';
import {
  ErrorMessage,
  Field,
  Formik,
  FormikProps,
  useFormikContext,
} from 'formik';
import { Box, FormHelperText } from '@material-ui/core';
import { useAuth } from '../../../utils/customHooks/useAuth';
import { Roles } from '../../../common/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root-reducer';
import Button from '@mui/material/Button';
import { steps } from '../CheckoutPage';

const validateSchema = Yup.object().shape({
  Name: Yup.string().required('Required'),
  Surname: Yup.string().required('Required'),
  Street: Yup.string().required('Required'),
  City: Yup.string().required('Required'),
  'Zip Code': Yup.string()
    .required('Required')
    .matches(/[0-9]{2}-[0-9]{3}/, 'Wrong format'),
  'Phone Number': Yup.string().required('Required').min(11, 'Wrong format'),
  Email: Yup.string().email('Invalid email').required('Required'),
});

export interface AddressFormValues {
  Name: string;
  Surname: string;
  Street: string;
  City: string;
  Email: string;
  'Zip Code': string;
  'Phone Number': string;
}

type Props = {
  setAddress: (values: AddressFormValues) => void;

  handleNext: () => void;
  address: AddressFormValues | null;
};

const AddressForm: React.FC<Props> = ({
  setAddress,

  handleNext,
  address,
}) => {
  const isLogged = useAuth() !== Roles.NONE;
  const { user } = useSelector((root: RootState) => root.user);
  const formikRef = React.useRef<FormikProps<AddressFormValues>>(null);

  const onDataLoadClick = () => {
    if (formikRef) {
      const { values } = formikRef.current!;
      formikRef.current!.setValues(
        {
          ...formikRef.current!.values,
          Name: user?.name ? user.name : values.Name,
          Surname: user?.surname ? user.surname : values.Surname,
          Street: user?.street ? user.street : values.Street,
          'Zip Code': user?.zipCode ? user.zipCode : values['Zip Code'],
          'Phone Number': user?.phone ? user.phone : values['Phone Number'],
          City: user?.city ? user.city : values.City,
          Email: user?.email ? user.email : values.Email,
        },
        true
      );
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          Name: address?.Name ? address.Name : '',
          Surname: address?.Surname ? address.Surname : '',
          Street: address?.Street ? address.Street : '',
          City: address?.City ? address.City : '',
          'Zip Code': address?.['Zip Code'] ? address['Zip Code'] : '',
          'Phone Number': address?.['Phone Number']
            ? address['Phone Number']
            : '',
          Email: address?.Email ? address.Email : '',
        }}
        validationSchema={validateSchema}
        onSubmit={() => console.log('onSubmit test')}
        innerRef={formikRef}
        enableReinitialize={true}
      >
        {({ errors, touched, resetForm, values }) => (
          <form>
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>
            <Grid container spacing={3}>
              {isLogged && (
                <Grid item xs={12}>
                  <Button variant="contained" onClick={() => onDataLoadClick()}>
                    Load data saved on your account
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <Field name={'Name'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        error={errors.Name && touched.Name}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'Name'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name={'Surname'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        error={errors.Surname && touched.Surname}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'Surname'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name={'Email'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        error={errors.Email && touched.Email}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'Email'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name={'Street'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="Address"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        error={errors.Street && touched.Street}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'Street'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field name={'City'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        error={errors.City && touched.City}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'City'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name={'Zip Code'}>
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <TextField
                        {...field}
                        disabled={isSubmitting}
                        required
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        error={errors['Zip Code'] && touched['Zip Code']}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'Zip Code'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field
                  name={'Phone Number'}
                  error={errors['Phone Number'] && touched['Phone Number']}
                >
                  {({ field, form: { isSubmitting } }: any) => (
                    <>
                      <MuiPhoneNumber
                        {...field}
                        disabled={isSubmitting}
                        defaultCountry={'pl'}
                        onChange={(value) => {
                          values['Phone Number'] = value.toString();
                        }}
                        regions={'europe'}
                        variant="standard"
                        margin="none"
                        size="small"
                        fullWidth
                        focused={true}
                        countryCodeEditable={false}
                      />
                      <FormHelperText style={{ color: 'red' }}>
                        <ErrorMessage name={'Phone Number'} />
                      </FormHelperText>
                    </>
                  )}
                </Field>
              </Grid>
            </Grid>
            <React.Fragment>
              <React.Fragment>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (Object.keys(errors).length === 0) {
                        setAddress(values);
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
            </React.Fragment>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddressForm;
