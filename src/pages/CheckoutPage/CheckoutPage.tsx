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
import ShippingMethod from './Forms/ShippingMethod';
import { ApiCallState } from '../../common/types';
import { Backdrop, CircularProgress } from '@material-ui/core';
import ErrorPage from '../ErrorPage/ErrorPage';
import { fetchData } from '../../redux/warehouse/action.creator';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import * as _ from 'lodash';
import axios from 'axios';
import { Divider } from '@mui/material';

export const steps = [
  'Shipping address',
  'Payment details',
  'Shipping Methods',
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
  shipment: Array<ShopShipmentMethodInfo> | null;
};

export type ShopShipmentMethodInfo = {
  storeName?: string;
  city: string;
  address: string;
  shipmentMethods: Array<string>;
  chosenMethod?: string;
  storeId?: string;
};

const getApiUrl = (storeId: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/get/deliveryMethod/${storeId}`;

const CheckoutPage = () => {
  const { items } = useSelector((root: RootState) => root.cart);
  const grouped = _.groupBy(items, 'storeId');
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
    shipment: null,
  });
  const [fetchStatus, setFetchStatus] = React.useState<ApiCallState>(
    ApiCallState.IDLE
  );
  const [shipmentMethods, setShipmentMethods] = React.useState<
    Array<ShopShipmentMethodInfo>
  >([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setFetchStatus(ApiCallState.FETCH_BEGIN);
      const resp = await Promise.all(
        Object.keys(grouped).map((storeId) => axios.get(getApiUrl(storeId)))
      );
      const data = resp.map((resp, index) => {
        const result = resp.data;
        return {
          ...result,
          storeName: Object.values(grouped)[index][0].storeName,
          storeId: Object.keys(grouped)[index],
        } as ShopShipmentMethodInfo;
      });
      setShipmentMethods(data);
      setOrderData({ ...orderData, shipment: data });

      setFetchStatus(ApiCallState.FETCH_SUCCESS);
    } catch (e) {
      setFetchStatus(ApiCallState.FETCH_ERROR);
    }
  };

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
          <ShippingMethod
            handleBack={handleBack}
            handleNext={handleNext}
            methods={shipmentMethods}
            setChosenMethod={setChosenMethod}
          />
        );
      case 3:
        return (
          <Review
            address={orderData.address.data!}
            payment={orderData.payment.data!}
            handleBack={handleBack}
            handleNext={handleNext}
            shipment={orderData.shipment!}
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

  const setChosenMethod = (
    methods: Array<{ storeId: string; method: string }>
  ) => {
    let shipData = orderData.shipment;
    methods.forEach((method) => {
      const indx = shipData!.findIndex(
        (data) => data.storeId === method.storeId
      );
      if (indx >= 0) {
        shipData![indx].chosenMethod = method.method;
      }
    });
    setOrderData({ ...orderData, shipment: shipData });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (
    fetchStatus === ApiCallState.IDLE ||
    fetchStatus === ApiCallState.FETCH_BEGIN
  ) {
    return (
      <Backdrop open={true} style={{ backgroundColor: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (fetchStatus === ApiCallState.FETCH_ERROR) {
    return <ErrorPage />;
  }

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
          <Divider orientation="horizontal" sx={{ mb: { xs: 3, md: 6 } }} />
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  We have emailed your order confirmation, and will send you an
                  update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment> {getStepContent(activeStep)}</React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutPage;
