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
import { WarehouseItem } from '../../../../common/types';
import ProductTableRow from './ProductTableRow/ProductTableRow';


const columns: Array<string> = ['ID', 'NAME', 'CATEGORY', 'PRICE', 'QTY'];

const data: Array<WarehouseItem> = [
  {
    id: '0001',
    name: 'Flower 1',
    category: 'Cat 1',
    price: 5.99,
    discount: null,
    quantity: 5,
  },
  {
    id: '0002',
    name: 'Flower 2',
    category: 'Cat 2',
    price: 5.99,
    discount: { newPrice: 4.99, dateFrom: new Date(), dateTo: new Date() },
    quantity: 5,
  },
];

const ProductTable = () => {
  const [selectedAll, setSelectAll] = useState<boolean>(false);
  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                style={{ fontWeight: 'bold' }}
                align="center"
              >
                <Typography>{column}</Typography>
              </TableCell>
            ))}
            <TableCell></TableCell>
            <TableCell></TableCell>

            <TableCell align="right">
              <FormControlLabel
                control={
                  <Checkbox
                    value={selectedAll}
                    onClick={() => setSelectAll(!selectedAll)}
                  />
                }
                label="Select&nbsp;all"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <ProductTableRow key={item.name} {...item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
