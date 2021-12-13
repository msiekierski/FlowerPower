import { Button, makeStyles, Typography } from '@material-ui/core';
import { IoIosReturnLeft } from 'react-icons/io';
import { FiTrash } from 'react-icons/fi';
import CartTable from '../../components/CartTable/CartTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { useHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/cart';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { CartBouquet, CartItemAvailability } from '../../common/types';

const useStyles = makeStyles((theme) => ({
  iconItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',
    cursor: 'pointer',
  },
  iconLabel: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  cartButtons: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItem: 'center',
    '&>div:only-child': {
      marginLeft: 'auto',
    },
  },
  orderButton: {
    padding: '10px 5%',
    marginLeft: 'auto',
  },
  cartFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'right',
    marginTop: '20px',
    rowGap: '15px',
  },
  errorMessage: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    border: '2px solid red',
    color: 'inherit',
  },
}));

const reservationUrl = `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/post/productReservation`;

const CartPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { clearCart } = bindActionCreators(actionCreators, dispatch);
  const [errorMsg, setErrorMsg] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cart = useSelector((state: RootState) => state.cart);

  const getBouquetPrice = (bouquet: CartBouquet) => {
    let sum = 0;
    bouquet.items.forEach((item) => (sum += item.itemPrice * item.quantity));
    return sum;
  };

  const itemsValue = cart.items
    .map((item) => item.itemPrice * item.quantity)
    .reduce((sum, item) => sum + item);
  const bouquetsValue = cart.bouquets
    .map((bouquet) => bouquet.quantity * getBouquetPrice(bouquet))
    .reduce((sum, item) => sum + item);

  const history = useHistory();

  const reserveProducts = async () => {
    try {
      setIsLoading(true);

      const reservationData = cart.items.map((product) => ({
        shopId: product.storeId,
        productId: product.productId,
        quantity: product.quantity,
      }));
      console.log('reservation');
      console.log(reservationData);
      const { data } = await axios.post(reservationUrl, {
        productLists: reservationData,
      });
      const notAvailableItems = (data as Array<CartItemAvailability>).filter(
        (item) => !item.hasInStock
      );
      let errData: Array<string> = [];
      if (notAvailableItems.length > 0) {
        notAvailableItems.forEach((item, index) => {
          const cartItem = cart.items.find(
            (cartItem) =>
              cartItem.productId === item.productId &&
              cartItem.storeId === item.shopId
          );
          errData.push(
            `${cartItem?.itemDescription} from ${cartItem?.storeName} - ${item.quantityLeft} items in shop's stock`
          );
        });
        setErrorMsg(errData);
        setIsLoading(false);
      } else {
        history.push('/cart/checkout');
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={classes.cartButtons}>
        {cart.items.length > 0 && (
          <div className={classes.iconItem} onClick={() => clearCart()}>
            <Typography className={classes.iconLabel}>CLEAR CART</Typography>
            <FiTrash style={{ fontSize: '1.7rem' }} />
          </div>
        )}
        <div className={classes.iconItem} onClick={() => history.goBack()}>
          <IoIosReturnLeft style={{ fontSize: '2rem' }} />
          <Typography className={classes.iconLabel}>RETURN</Typography>
        </div>
      </div>
      {cart.items.length ? (
        <>
          {errorMsg.length > 0 && (
            <Alert
              severity="error"
              variant="filled"
              className={classes.errorMessage}
            >
              <Typography>One or more item is out of stock.</Typography>
              {errorMsg.map((error, index) => (
                <Typography key={index}>{error}</Typography>
              ))}
            </Alert>
          )}
          <CartTable />
          <div className={classes.cartFooter}>
            <Typography variant="h5" align="right">
              <b>IN TOTAL: </b> {(itemsValue + bouquetsValue).toFixed(2)} PLN
            </Typography>

            <Button
              color="secondary"
              variant="contained"
              className={classes.orderButton}
              disabled={isLoading}
              onClick={async () => {
                await reserveProducts();
              }}
            >
              <Typography align="right">PAY AND ORDER</Typography>
            </Button>
          </div>
        </>
      ) : (
        <Typography variant="h3" align="center" style={{ marginTop: '20vh' }}>
          YOUR&nbsp;CART IS&nbsp;EMPTY
        </Typography>
      )}
    </>
  );
};

export default CartPage;
