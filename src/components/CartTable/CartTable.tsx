import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { CartProduct } from '../../common/types';
import CartTableRow from './CartTableRow/CartTableRow';

const cartColumns: Array<string> = ['PRODUCT', 'PRICE', 'QTY', 'TOTAL'];

const cartData: Array<CartProduct> = [
  {
    productImageUrl:
      'https://www.trigartflowernursery.com/wp-content/uploads/2020/12/red-rose.jpg',
    itemDescription: 'Red rose (#000001)',
    storeName: `Nowak's Flower Shop`,
    itemPrice: 5.99,
    quantity: 4,
  },
];

const useStyles = makeStyles((theme) => ({
  detailsRow: {
    '& > td': {
      borderBottom: 'none',
    },
    '& > th': {
      borderBottom: 'none',
    },
  },
  
}));

const CartTable = () => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            {cartColumns.map((columnName, index) => (
              <TableCell
                key={index}
                style={{ fontWeight: 'bold' }}
                align="center"
              >
                <Typography>{columnName}</Typography>
              </TableCell>
            ))}
            <TableCell style={{ minWidth: '10px' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartData.map((orderItem, index) => (
            <CartTableRow key={index} cartProduct={orderItem} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
