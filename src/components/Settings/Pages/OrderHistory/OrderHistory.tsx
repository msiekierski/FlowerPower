import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { FlowerColor, Order, OrderStatus } from '../../../../common/types';
import OrderHistoryRow from './OrderHistoryRow';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '3%',
  },
}));

const tableColumns: Array<string> = [
  'Order Number',
  'Date',
  'Status',
  'Details',
];

const data: Array<Order> = [
  {
    orderNumber: 12394021,
    date: new Date(),
    status: OrderStatus.PLACED,
    orderedItems: [
      {
        itemImageUrl:
          'https://fyf.tac-cdn.net/images/products/large/F-208.jpg?auto=webp&quality=60&width=690',
        name: 'Everlasting red roses (medium)',
        color: FlowerColor.RED,
        quantity: 1,
        price: 500.0,
      },
      {
        itemImageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0zYbkEXDIebjl40pacBdl59GgSOwg9vrJ1w&usqp=CAU',
        name: 'Everlasting red roses (medium)',
        color: FlowerColor.BLUE,
        quantity: 2,
        price: 100.0,
      },
    ],
  },
  {
    orderNumber: 12394021,
    date: new Date(),
    status: OrderStatus.PLACED,
    orderedItems: [
      {
        itemImageUrl: '...',
        name: 'Everlasting red roses (medium)',
        color: FlowerColor.BLUE,
        quantity: 1,
        price: 500.0,
      },
    ],
  },
  {
    orderNumber: 12394021,
    date: new Date(),
    status: OrderStatus.PLACED,
    orderedItems: [
      {
        itemImageUrl: '...',
        name: 'Everlasting red roses (medium)',
        color: FlowerColor.RED,
        quantity: 1,
        price: 500.0,
      },
    ],
  },
  {
    orderNumber: 12394021,
    date: new Date(),
    status: OrderStatus.PLACED,
    orderedItems: [
      {
        itemImageUrl: '...',
        name: 'Everlasting red roses (medium)',
        color: FlowerColor.RED,
        quantity: 1,
        price: 500.0,
      },
    ],
  },
  {
    orderNumber: 12394021,
    date: new Date(),
    status: OrderStatus.PLACED,
    orderedItems: [
      {
        itemImageUrl: '...',
        name: 'Everlasting red roses (medium)',
        color: FlowerColor.RED,
        quantity: 1,
        price: 500.0,
      },
    ],
  },
];

const OrderHistory = () => {
  const classes = useStyles();
  return (
    <>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              {tableColumns.map((columnName, index) => {
                return (
                  <TableCell key={index}>
                    <Typography>{columnName}</Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order, index) => (
              <OrderHistoryRow order={order} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderHistory;
