import {
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import { Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FlowerColor, Order, OrderStatus } from '../../../../common/types';
import OrderHistoryRow from './OrderHistoryRow';
// @ts-ignore
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  dateContainer: {
    marginTop: '10px',
    border: 'none',
  },
}));

const tableColumns: Array<string> = [
  'Order Number',
  'Date',
  'Status',
  'Details',
];

let date1 = new Date();
date1.setDate(date1.getDate() - 10);
let date2 = new Date();
date2.setDate(date2.getDate() - 30);

const data: Array<Order> = [
  {
    orderNumber: 12394021,
    date: date1,
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
    orderNumber: 12394022,
    date: date2,
    status: OrderStatus.READY_TO_SEND,
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
    orderNumber: 12394023,
    date: new Date(),
    status: OrderStatus.PAID,
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
    orderNumber: 12394024,
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
    orderNumber: 12394025,
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
  const maxDate = new Date(
    Math.max(...data.map((data) => data.date.getTime()))
  );
  const minDate = new Date(
    Math.min(...data.map((data) => data.date.getTime()))
  );

  const classes = useStyles();
  const [filterDate, setFilterDate] = useState([minDate, maxDate]);
  const [selectedIds, setSelectedIds] = useState<Array<number>>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Array<string>>([]);
  const [filteredData, setFilteredData] = useState<Array<Order>>(data);
  const orderStatus = Object.values(OrderStatus);

  useEffect(() => {
    let filtered = filteredData;
    if (selectedIds.length > 0) {
      filtered = data.filter((data) => selectedIds.includes(data.orderNumber));
    } else {
      filtered = data;
    }
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((data) =>
        selectedStatuses.includes(data.status)
      );
    }

    filtered = filtered.filter(
      (data) =>
        data.date.getTime() >= filterDate[0].getTime() &&
        data.date.getTime() <= filterDate[1].getTime()
    );
    setFilteredData(filtered);
  }, [filterDate, selectedIds, selectedStatuses]);

  return (
    <>
      <Autocomplete
        multiple
        options={data}
        disableCloseOnSelect
        getOptionLabel={(item) => item.orderNumber.toString()}
        onChange={(event, value) =>
          setSelectedIds(value.map((value) => value.orderNumber))
        }
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              checked={selected}
            />
            {option.orderNumber}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Filter by order number" />
        )}
        isOptionEqualToValue={(option, value) =>
          value.orderNumber === option.orderNumber
        }
      />
      <Autocomplete
        multiple
        options={orderStatus}
        disableCloseOnSelect
        getOptionLabel={(item) => item}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Filter by status" />
        )}
        onChange={(event, value) =>
          setSelectedStatuses(value.map((value) => value))
        }
      />

      <DateRangePicker
        className={classes.dateContainer}
        onChange={setFilterDate}
        value={filterDate}
        minDate={minDate}
        maxDate={maxDate}
        clearIcon={null}
      />

      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              {tableColumns.map((columnName, index) => {
                return (
                  <TableCell key={index}>
                    <Typography style={{ fontWeight: 'bold' }}>
                      {columnName}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((order, index) => (
              <OrderHistoryRow order={order} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderHistory;
