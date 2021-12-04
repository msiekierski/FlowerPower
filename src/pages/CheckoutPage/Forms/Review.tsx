import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root-reducer';
import { AddressFormValues } from './AddressForm';
import { Box, makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import { PaymentFormValues } from './PaymentForm';
import axios from 'axios';
import { ShopShipmentMethodInfo } from '../CheckoutPage';
import { Divider } from '@mui/material';
import * as _ from 'lodash';

type Props = {
  address: AddressFormValues;
  payment: PaymentFormValues;
  shipment: Array<ShopShipmentMethodInfo>;
  handleNext: () => void;
  handleBack: () => void;
};

const apiUrl = `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/post/clientInfoForOrder`;

const useStyles = makeStyles((theme) => ({
  methods: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Review: React.FC<Props> = ({
  address,
  handleNext,
  handleBack,
  payment,
  shipment,
}) => {
  const classes = useStyles();
  const root = useSelector((root: RootState) => root);
  const { items } = root.cart;
  const [isPlacingOrder, setIsPlacingOrder] = React.useState<boolean>(false);
  const addresses = [
    `${address.Street}`,
    `${address.City} ${address['Zip Code']}`,
  ];
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: payment.name },
    {
      name: 'Card number',
      detail: `xxxx-xxxx-xxxx-${payment.cardNumber.slice(-4)}`,
    },
    { name: 'Expiry date', detail: payment.expiryDate },
  ];

  const groupedById = _.groupBy(items, 'storeId');

  const placeOrder = async () => {
    try {
      setIsPlacingOrder(true);
      const body = {
        clientId: root.user.user?.id,
        email: address.Email,
        name: address.Name,
        surname: address.Surname,
        phone: address['Phone Number'],
        deliveryInfo: {
          address: address.Street,
          postalCode: address['Zip Code'],
          city: address.City,
        },
        paymentType: 'Visa',
        cardInfoModel: {
          cardNumber: payment.cardNumber,
          expirationDate: payment.expiryDate,
          cvv2Number: payment.cvvNumber,
          cardOwner: payment.name,
        },
        shopProductListList: Object.keys(groupedById).map((storeId) => ({
          shopId: storeId,
          shipmentMethod: shipment.find((ship) => ship.storeId === storeId)!
            .chosenMethod,
          productLists: groupedById[storeId].map((product) => ({
            productId: product.productId,
            quanitity: product.quantity,
          })),
        })),
        comments: '',
      };

      const { data } = await axios.post(apiUrl, body);
      console.log('resp');
      console.log(data);
      setIsPlacingOrder(false);
    } catch (e) {
      setIsPlacingOrder(false);
    }
    handleNext();
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.productId} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={<Typography>{item.itemDescription}</Typography>}
              secondary={
                <>
                  <Typography>{`Store: ${item.storeName}`}</Typography>
                  <Typography>{`Quantity: ${item.quantity}`}</Typography>
                </>
              }
            />
            <Typography variant="body2">
              {(item.itemPrice * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {items
              .map((item) => item.itemPrice * item.quantity)
              .reduce((sum, item) => sum + item)
              .toFixed(2)}{' '}
            PLN
          </Typography>
        </ListItem>
      </List>
      <Divider orientation="horizontal" sx={{ my: { xs: 1, md: 1 } }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography
            gutterBottom
          >{`${address.Name} ${address.Surname}`}</Typography>
          <Typography gutterBottom>{address.Email}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
          <Typography gutterBottom>{address['Phone Number']}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" sx={{ my: { xs: 1, md: 1 } }} />
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Shipment Methods
      </Typography>
      {shipment.map((ship, index) => (
        <div key={index} className={classes.methods}>
          <ListItemText
            primary={<Typography>{ship.storeName}</Typography>}
            secondary={
              <Typography
                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
              >{`${ship.address}, ${ship.city}`}</Typography>
            }
          />
          <Typography>{ship.chosenMethod}</Typography>
        </div>
      ))}
      <Divider orientation="horizontal" sx={{ my: { xs: 1, md: 1 } }} />
      <React.Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              placeOrder();
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Place Order
          </Button>
        </Box>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Review;
