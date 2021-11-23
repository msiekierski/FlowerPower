import { TableRow, Typography } from '@material-ui/core';
import { Checkbox, TableCell } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WarehouseItem } from '../../../../../common/types';
import { actionCreators } from '../../../../../redux/warehouse';
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
  const dispatch = useDispatch();
  const { toggleSelection, removeById } = bindActionCreators(
    actionCreators,
    dispatch
  );
  return (
    <TableRow>
      <TableCell align="center">
        <Typography>#{id}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography>{name}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography>{category}</Typography>
      </TableCell>
      <TableCell align="center">
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
      <TableCell align="center">
        <Typography>{quantity}</Typography>
      </TableCell>
      <TableCell align="right" style={{ cursor: 'pointer' }}>
        <Typography style={{ fontWeight: 'bold' }}>Edit</Typography>
      </TableCell>
      <TableCell
        align="right"
        style={{ cursor: 'pointer' }}
        onClick={() => removeById(id)}
      >
        <Typography style={{ fontWeight: 'bold' }}>Remove</Typography>
      </TableCell>
      <TableCell align="center">
        <Checkbox checked={isSelected} onClick={() => toggleSelection(id)} />
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
