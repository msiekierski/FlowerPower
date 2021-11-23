import { TableRow, Typography } from '@material-ui/core';
import { Checkbox, TableCell } from '@mui/material';
import React, { useState } from 'react';
import { WarehouseItem } from '../../../../../common/types';
import dateToWarehouseDateString from '../../../../../utils/functions/dateToWarehouseString';

const ProductTableRow: React.FC<WarehouseItem> = ({
  id,
  name,
  category,
  price,
  discount,
  quantity,
  isSelected,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <TableRow>
      <TableCell>
        <Typography>#{id}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{category}</Typography>
      </TableCell>
      <TableCell>
        <Typography
          style={{ textDecoration: discount ? 'line-through' : 'inherit' }}
          align="center"
        >
          {price}PLN
        </Typography>
        {discount && (
          <>
            <Typography align="center">{discount.newPrice}PLN</Typography>
            <Typography align="center">
              ({dateToWarehouseDateString(discount.dateFrom)}-
              {dateToWarehouseDateString(discount.dateTo)})
            </Typography>
          </>
        )}
      </TableCell>
      <TableCell>
        <Typography>{quantity}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography style={{ fontWeight: 'bold' }}>Edit</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography style={{ fontWeight: 'bold' }}>Remove</Typography>
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
