import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WarehouseItem } from '../../../../common/types';
import { RootState } from '../../../../redux/root-reducer';
import { actionCreators } from '../../../../redux/warehouse';
import ProductTableRow from './ProductTableRow/ProductTableRow';

const columns: Array<string> = ['ID', 'NAME', 'CATEGORY', 'PRICE', 'QTY'];

type Props = {
  items: Array<WarehouseItem>;
};

const ProductTable: React.FC<Props> = ({ items }) => {
  const { selectAll } = useSelector((root: RootState) => root.warehouse);
  const dispatch = useDispatch();
  const { toggleSelectAll } = bindActionCreators(actionCreators, dispatch);
  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align="center">
                <Typography style={{ fontWeight: 'bold' }}>{column}</Typography>
              </TableCell>
            ))}
            <TableCell></TableCell>
            <TableCell></TableCell>

            <TableCell align="right">
              <FormControlLabel
                control={
                  <Checkbox
                    value={selectAll}
                    onClick={() => toggleSelectAll()}
                  />
                }
                label="Select&nbsp;all"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <ProductTableRow key={item.name} {...item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
