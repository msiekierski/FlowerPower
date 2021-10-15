import { TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { CartProduct } from '../../../common/types';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';

type Props = {
  cartProduct: CartProduct;
};

const useStyles = makeStyles((theme) => ({
  actionText: {
    cursor: 'ponter',
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

  return (
    <TableRow>
      <TableCell>
        <div className={classes.articleDescription}>
          <img src={cartProduct.productImageUrl} alt="cart item" />
          <div>
            <Typography>{cartProduct.itemDescription}</Typography>
            <Typography>from {cartProduct.storeName}</Typography>
          </div>
        </div>
      </TableCell>
      <TableCell align="center">
        <Typography variant="h5">{cartProduct.itemPrice} PLN</Typography>
      </TableCell>
      <TableCell align="center">
        <div className={classes.quantity}>
          <AiOutlineMinus size={25} style={{ padding: '10px' }} />
          <Typography variant="h4">{cartProduct.quantity}</Typography>
          <AiOutlinePlus size={25} style={{ padding: '10px' }} />
        </div>
      </TableCell>
      <TableCell align="center">
        <Typography variant="h5">
          {cartProduct.itemPrice * cartProduct.quantity} PLN
        </Typography>
      </TableCell>
      <TableCell>
        <ImCross style={{ color: 'rgba(204, 77, 3, 0.9)' }} size={25} />
      </TableCell>
    </TableRow>
  );
};

export default CartTableRow;
