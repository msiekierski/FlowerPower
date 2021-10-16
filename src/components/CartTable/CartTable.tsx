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
import { CartProduct } from '../../common/types';
import CartTableRow from './CartTableRow/CartTableRow';
import { RootState } from '../../redux/root-reducer';

const cartColumns: Array<string> = ['PRODUCT', 'PRICE', 'QTY', 'TOTAL'];

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

  const cartItems = useSelector((state: RootState) => state.cart.items);
  

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
          {cartItems.map((orderItem, index) => (
            <CartTableRow key={index} cartProduct={orderItem} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
