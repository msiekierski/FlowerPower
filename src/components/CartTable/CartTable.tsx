import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import CartTableRow from './CartTableRow/CartTableRow';
import { RootState } from '../../redux/root-reducer';
import { CartBouquet, CartProduct } from '../../common/types';

const cartColumns: Array<string> = ['PRODUCT', 'PRICE', 'QTY', 'TOTAL'];

const CartTable = () => {
  const cart = useSelector((state: RootState) => state.cart);

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
          {cart.items.map((orderItem, index) => (
            <CartTableRow key={index} cartProduct={orderItem} />
          ))}
          {cart.bouquets.map((orderItem, index) => (
            <CartTableRow key={index} cartProduct={orderItem} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
