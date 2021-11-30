import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm, { AddressFormValues } from './Forms/AddressForm';
import PaymentForm, { PaymentFormValues } from './Forms/PaymentForm';
import Review from './Forms/Review';

export const steps = [
  'Shipping address',
  'Payment details',
  'Review your order',
];

const theme = createTheme();

type OrderDetails = {
  address: {
    isCorrect: boolean;
    data: AddressFormValues | null;
  };
  payment: {
    isCorrect: boolean;
    data: PaymentFormValues | null;
  };
};

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderData, setOrderData] = React.useState<OrderDetails>({
    address: {
      isCorrect: false,
      data: null,
    },
    payment: {
      isCorrect: false,
      data: null,
    },
  });

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            address={orderData.address.data}
            setAddress={setAddress}
          
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <PaymentForm
          
            handleBack={handleBack}
            handleNext={handleNext}
            payment={orderData.payment.data}
            setPayment={setPayment}
          />
        );
      case 2:
        return (
          <Review
            address={orderData.address.data!}
            payment={orderData.payment.data!}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  const setAddress = (values: AddressFormValues) => {
    setOrderData({
      ...orderData,
      address: { isCorrect: true, data: values },
    });
  };

  const setPayment = (values: PaymentFormValues) => {
    setOrderData({
      ...orderData,
      payment: { isCorrect: true, data: values },
    });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutPage;
