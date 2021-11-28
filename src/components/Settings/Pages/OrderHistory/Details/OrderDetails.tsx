import {
  CardMedia,
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
    gap: '10px',
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
  details: {
    minWidth: '550px',
  },
}));

const detailsColumns: Array<String> = [
  'Article',
  'Color',
  'Unit Price',
  'Quantity',
  'Total Price',
];

const OrderDetails: React.FC<Props> = ({ orderedItems }) => {
  const classes = useStyles();
  const orderTotalPrice = orderedItems
    .map((item) => (item.price - item.priceDiscount) * item.quantity)
    .reduce((acc, curr) => acc + curr);

  return (
    <>
      <Table className={classes.details}>
        <TableHead>
          <TableRow className={classes.detailsRow}>
            {detailsColumns.map((name, index) => (
              <TableCell align="center" key={index} variant="head">
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
                  <CardMedia
                    component="img"
                    style={{
                      width: '80px',
                      height: '70px',
                      maxWidth: '80px',
                      maxHeight: '70px',
                      objectFit: 'fill',
                    }}
                    alt="ordered item"
                    src={item.itemImageUrl}
                  />

                  <div>{item.name}</div>
                </div>
              </TableCell>
              <TableCell align="center">
                <div
                  className={classes.circle}
                  style={{
                    background:
                      item.color === 'mix'
                        ? 'linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)'
                        : item.color,
                  }}
                ></div>
                {item.color}
              </TableCell>
              <TableCell align="center">
                <Typography
                  style={{
                    textDecoration:
                      item.priceDiscount > 0 ? 'line-through' : 'inherit',
                  }}
                >
                  {item.price} PLN
                </Typography>
                {item.priceDiscount > 0 && (
                  <Typography>
                    {(item.price - item.priceDiscount).toFixed(2)} PLN
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">
                <Typography>{item.quantity}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{item.lineTotal.toFixed(2)} PLN</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className={classes.detailsRow}>
            <TableCell align="right" colSpan={detailsColumns.length}>
              <Typography variant="h6">
                IN TOTAL: {orderTotalPrice.toFixed(2)} PLN
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default OrderDetails;
