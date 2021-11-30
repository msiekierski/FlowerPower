import {
  Backdrop,
  Checkbox,
  CircularProgress,
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
import { ApiCallState, Order, OrderStatus } from '../../../../common/types';
import OrderHistoryRow from './OrderHistoryRow';
// @ts-ignore
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import ErrorPage from '../../../../pages/ErrorPage/ErrorPage';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root-reducer';
import { apiOrderHistoryToState } from '../../../../utils/objectMapping/apiOrderHistoryToState';

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

const apiUrl = `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/orderHistory`;

const OrderHistory = () => {
  const classes = useStyles();
  const { user } = useSelector((root: RootState) => root.user);
  const [data, setData] = useState<Array<Order>>([]);
  const [fetchStatus, setFetchStatus] = useState<ApiCallState>(
    ApiCallState.IDLE
  );
  const [selectedIds, setSelectedIds] = useState<Array<number>>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Array<string>>([]);
  const [filteredData, setFilteredData] = useState<Array<Order>>(data);
  const orderStatus = Array.from(new Set(data.map((data) => data.status)));

  const [filterDate, setFilterDate] = useState([new Date(), new Date()]);
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

  const fetchData = async () => {
    try {
      setFetchStatus(ApiCallState.FETCH_BEGIN);
      const { data } = await axios.get(apiUrl, {
        params: { personId: user!.id },
      });
      const mappedData: Array<Order> = data.map((obj: any) =>
        apiOrderHistoryToState(obj)
      );
      setData(mappedData);
      const maxDate = new Date(
        Math.max(...mappedData.map((order: Order) => order.date.getTime()))
      );
      const minDate = new Date(
        Math.min(...mappedData.map((order: Order) => order.date.getTime()))
      );
      setFilterDate([minDate, maxDate]);
      setFetchStatus(ApiCallState.FETCH_SUCCESS);
    } catch (e) {
      setFetchStatus(ApiCallState.FETCH_ERROR);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (
    fetchStatus === ApiCallState.FETCH_BEGIN ||
    fetchStatus === ApiCallState.IDLE
  ) {
    return (
      <Backdrop open={true} style={{ backgroundColor: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (fetchStatus === ApiCallState.FETCH_ERROR) {
    return <ErrorPage />;
  }

  return (
    <>
      {data.length > 0 && (
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
            minDate={filterDate[0]}
            maxDate={filterDate[1]}
            clearIcon={null}
          />
        </>
      )}

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
            {data.length === 0 && (
              <Typography
                variant="h5"
                style={{
                  position: 'relative',
                  left: '50%',
                  marginTop: '30px',
                }}
              >
                Your order history is empty
              </Typography>
            )}
            {data.length > 0 && filteredData.length === 0 && (
              <Typography
                variant="h5"
                style={{
                  position: 'relative',
                  left: '50%',
                  marginTop: '30px',
                }}
              >
                No order matches selected filters
              </Typography>
            )}
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
