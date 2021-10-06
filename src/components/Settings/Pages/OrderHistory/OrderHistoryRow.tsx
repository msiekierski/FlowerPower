import { makeStyles, TableCell, TableRow, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { Order } from '../../../../common/types';
import OrderDetails from './Details/OrderDetails';

type Props = {
  order: Order;
};

const useStyles = makeStyles((theme) => ({
  expandedRow: {
    '& > td': {
      borderBottom: 'none',
    },
  },
  detailsCell: {
    cursor: 'pointer',
  },
}));

const OrderHistoryRow: React.FC<Props> = ({ order }) => {
  const { orderNumber, date, status, orderedItems } = order;
  const [isExpanded, setIsExpanded] = useState(false);

  const classes = useStyles();

  return (
    <>
      <TableRow className={`${isExpanded && classes['expandedRow']}`}>
        <TableCell>{orderNumber}</TableCell>
        <TableCell>{date.toDateString()}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell
          onClick={() => setIsExpanded(!isExpanded)}
          className={classes.detailsCell}
        >
          {isExpanded ? '-' : '+'}
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={4}>
            <OrderDetails orderedItems={orderedItems} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default OrderHistoryRow;
