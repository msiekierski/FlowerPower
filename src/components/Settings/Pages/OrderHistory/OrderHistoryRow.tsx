import { makeStyles, TableCell, TableRow, Typography } from '@material-ui/core';
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
        <TableCell>
          <Typography>{orderNumber}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{date.toDateString()}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{status}</Typography>
        </TableCell>
        <TableCell
          onClick={() => setIsExpanded(!isExpanded)}
          className={classes.detailsCell}
        >
          <Typography>{isExpanded ? '-' : '+'}</Typography>
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
