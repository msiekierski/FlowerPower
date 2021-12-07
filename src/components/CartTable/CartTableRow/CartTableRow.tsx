import { TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { CartBouquet, CartProduct } from '../../../common/types';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/cart';
import { TextField } from '@mui/material';

type Props = {
  cartProduct: CartProduct | CartBouquet;
};

const useStyles = makeStyles((theme) => ({
  actionText: {
    cursor: 'pointer',
  },
  articleDescription: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    columnGap: '10px',
    '& img': {
      width: '100%',
      height: '100%',
      maxHeight: '90px',
      maxWidth: '90px',
      objectFit: 'fill',
    },
  },
  quantity: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',
  },
}));

const CartTableRow: React.FC<Props> = ({ cartProduct }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { removeItem, increaseQuantity, decreaseQuanitity, setArbitraryValue } =
    bindActionCreators(actionCreators, dispatch);

  const getBouquetPrice = (bouquet: CartBouquet) => {
    let sum = 0;
    bouquet.items.forEach((item) => (sum += item.itemPrice * item.quantity));
    return sum;
  };

  useEffect(() => {});
  if (Object.keys(cartProduct).includes('items')) {
    const bouquet = cartProduct as CartBouquet;
    return (
      <TableRow>
        <TableCell align="left">
          <div className={classes.articleDescription}>
            <div>
              {bouquet.items.map((item) => (
                <>
                  <Typography>{item.itemDescription}</Typography>
                </>
              ))}
              <Typography>from {bouquet.shopName}</Typography>
            </div>
          </div>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">{getBouquetPrice(bouquet)} PLN</Typography>
        </TableCell>
        <TableCell align="center">
          <div className={classes.quantity}>
            <div className={classes.actionText} onClick={() => {}}>
              <AiOutlineMinus size={35} />
            </div>
            <TextField
              type="tel"
              style={{ width: '60px' }}
              inputProps={{
                style: { textAlign: 'center' },
              }}
              value={1}
              // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              //   const value = +event.target.value;
              //   if (!(Number.isNaN(value) || value <= 0 || value > 1000)) {
              //     setArbitraryValue(productId, value);
              //   }
              // }}
            />
            <div className={classes.actionText} onClick={() => {}}>
              <AiOutlinePlus size={35} />
            </div>
          </div>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">
            {getBouquetPrice(bouquet).toFixed(2)} PLN
          </Typography>
        </TableCell>
        <TableCell>
          <ImCross
            className={classes.actionText}
            style={{ color: 'rgba(204, 77, 3, 0.9)' }}
            size={25}
            onClick={() => {}}
          />
        </TableCell>
      </TableRow>
    );
  } else {
    const product = cartProduct as CartProduct;
    const {
      productImageUrl,
      itemDescription,
      storeName,
      quantity,
      itemPrice,
      productId,
    } = product;
    return (
      <TableRow>
        <TableCell align="left">
          <div className={classes.articleDescription}>
            <img src={productImageUrl} alt="cart item" />
            <div>
              <Typography>{itemDescription}</Typography>
              <Typography>from {storeName}</Typography>
            </div>
          </div>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">{itemPrice} PLN</Typography>
        </TableCell>
        <TableCell align="center">
          <div className={classes.quantity}>
            <div
              className={classes.actionText}
              onClick={() => decreaseQuanitity(productId)}
            >
              <AiOutlineMinus size={35} />
            </div>
            <TextField
              type="tel"
              style={{ width: '60px' }}
              inputProps={{
                style: { textAlign: 'center' },
              }}
              value={quantity}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = +event.target.value;
                if (!(Number.isNaN(value) || value <= 0 || value > 1000)) {
                  setArbitraryValue(productId, value);
                }
              }}
            />
            <div
              className={classes.actionText}
              onClick={() => increaseQuantity(productId)}
            >
              <AiOutlinePlus size={35} />
            </div>
          </div>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">
            {(itemPrice * quantity).toFixed(2)} PLN
          </Typography>
        </TableCell>
        <TableCell>
          <ImCross
            className={classes.actionText}
            style={{ color: 'rgba(204, 77, 3, 0.9)' }}
            size={25}
            onClick={() => removeItem(productId)}
          />
        </TableCell>
      </TableRow>
    );
  }
};

export default CartTableRow;
