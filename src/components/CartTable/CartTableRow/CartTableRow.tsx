import { TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { CartProduct } from '../../../common/types';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/cart';

type Props = {
  cartProduct: CartProduct;
};

const useStyles = makeStyles((theme) => ({
  actionText: {
    cursor: 'pointer',
  },
  articleDescription: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    columnGap: '10px',
    '& img': {
      width: '100%',
      height: '100%',
      maxHeight: '90px',
      maxWidth: '90px',
      objectFit: 'cover',
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
  const {
    productImageUrl,
    itemDescription,
    storeName,
    quantity,
    itemPrice,
    productId,
  } = cartProduct;

  const dispatch = useDispatch();
  const { removeItem, increaseQuantity, decreaseQuanitity } =
    bindActionCreators(actionCreators, dispatch);

  return (
    <TableRow>
      <TableCell>
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
            <AiOutlineMinus size={25} style={{ padding: '10px' }} />
          </div>
          <Typography variant="h4">{quantity}</Typography>
          <div
            className={classes.actionText}
            onClick={() => increaseQuantity(productId)}
          >
            <AiOutlinePlus size={25} style={{ padding: '10px' }} />
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
};

export default CartTableRow;
