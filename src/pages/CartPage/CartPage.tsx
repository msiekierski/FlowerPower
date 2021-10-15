import { Button, ListItem, makeStyles, Typography } from '@material-ui/core';
import { IoIosReturnLeft } from 'react-icons/io';
import { FiTrash } from 'react-icons/fi';
import React from 'react';
import CartTable from '../../components/CartTable/CartTable';

const useStyles = makeStyles((theme) => ({
  iconItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItem: 'center',
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

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Your Cart
        </Typography>
      </div>
      <div className={classes.cartButtons}>
        <div className={classes.iconItem}>
          <IoIosReturnLeft style={{ fontSize: '2rem' }} />
          <Typography className={classes.iconLabel}>RETURN</Typography>
        </div>
        <div className={classes.iconItem}>
          <Typography className={classes.iconLabel}>CLEAR CART</Typography>
          <FiTrash style={{ fontSize: '1.7rem' }} />
        </div>
      </div>
      <CartTable />
      <div className={classes.cartFooter}>
        <Typography variant="h5" align="right">
          <b>IN TOTAL: </b> 23,96 PLN
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          className={classes.orderButton}
        >
          <Typography>PAY AND ORDER</Typography>
        </Button>
      </div>
    </>
  );
};

export default CartPage;
