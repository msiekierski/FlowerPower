import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { OrderItem } from '../../../../../common/types';

type Props = {
  orderedItems: Array<OrderItem>;
};

const useStyles = makeStyles((theme) => ({
  articleDescription: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100px',
    maxWidth: '90px',
    margin: 'auto',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  circle: {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    margin: 'auto',
    marginBottom: '5px',
  },
  detailsRow: {
    '& > td': {
      borderBottom: 'none',
    },
    '& > th': {
      borderBottom: 'none',
    },
  },
}));

const detailsColumns: Array<String> = [
  'Article Description',
  'Color',
  'Unit Price',
  'Quantity',
  'Total Price',
];

const OrderDetails: React.FC<Props> = ({ orderedItems }) => {
  const classes = useStyles();
  const orderTotalPrice = orderedItems
    .map((item) => item.price * item.quantity)
    .reduce((acc, curr) => acc + curr);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow className={classes.detailsRow}>
            {detailsColumns.map((name, index) => (
              <TableCell align="center" key={index}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedItems.map((item, index) => (
            <TableRow key={index} className={classes.detailsRow}>
              <TableCell align="center">
                <div className={classes.articleDescription}>
                  <img src={item.itemImageUrl} alt="ordered item" />
                  <div>{item.name}</div>
                </div>
              </TableCell>
              <TableCell align="center">
                <div
                  className={classes.circle}
                  style={{ backgroundColor: item.color }}
                ></div>
                {item.color}
              </TableCell>
              <TableCell align="center">{item.price} PLN</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="center">
                {item.price * item.quantity} PLN
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className={classes.detailsRow}>
            <TableCell align="right" colSpan={detailsColumns.length}>
              <Typography variant="h6">
                IN TOTAL: {orderTotalPrice} PLN
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default OrderDetails;
