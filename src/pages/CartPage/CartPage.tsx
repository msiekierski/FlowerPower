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
}));

const CartPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { clearCart } = bindActionCreators(actionCreators, dispatch);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const history = useHistory();

  return (
    <>
      <div className={classes.cartButtons}>
        {cartItems.length > 0 && (
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
      {cartItems.length ? (
        <>
          <CartTable />
          <div className={classes.cartFooter}>
            <Typography variant="h5" align="right">
              <b>IN TOTAL: </b>{' '}
              {cartItems
                .map((item) => item.itemPrice * item.quantity)
                .reduce((sum, item) => sum + item)
                .toFixed(2)}{' '}
              PLN
            </Typography>
            <Link
              to="/cart/checkout"
              style={{ display: 'flex', alignItems: 'end' }}
            >
              <Button
                color="secondary"
                variant="contained"
                className={classes.orderButton}
              >
                <Typography align="right">PAY AND ORDER</Typography>
              </Button>
            </Link>
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
