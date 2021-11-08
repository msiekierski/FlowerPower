import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ApiCallState, ComparisonItem } from '../../common/types';
import ItemComparisonCard from '../../components/ItemComparisonCard/ItemComparisonCard';
import ErrorPage from '../ErrorPage/ErrorPage';
import axios from 'axios';
import apiProductCompToState from '../../utils/objectMapping/apiProductCompToState';

type PageProps = {
  itemId: string;
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    marginTop: theme.spacing(3),
  },
  filters: {
    flex: '1 1 30%',
  },
  searchResult: {
    flex: '1 1 70%',
  },
}));

const apiUrl = `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/compareProducts`;

const ComparePricesPage = () => {
  const { itemId } = useParams<PageProps>();
  const [fetchStatus, setFetchStatus] = useState<ApiCallState>(
    ApiCallState.IDLE
  );
  const [data, setData] = useState<Array<ComparisonItem>>([]);
  const classes = useStyles();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setFetchStatus(ApiCallState.FETCH_BEGIN);
      console.log(itemId);
      const { data } = await axios.get(apiUrl, {
        params: { productId: itemId, city: 'wroclaw' },
      });
      const mappedData: Array<ComparisonItem> = data.map((obj: any) =>
        apiProductCompToState(obj)
      );
      mappedData.sort((first, second) => first.price - second.price);
      setData(mappedData);
      setFetchStatus(ApiCallState.FETCH_SUCCESS);
    } catch (e) {
      setFetchStatus(ApiCallState.FETCH_ERROR);
    }
  };

  if (
    fetchStatus === ApiCallState.IDLE ||
    fetchStatus === ApiCallState.FETCH_BEGIN
  ) {
    return (
      <Backdrop open={true} style={{ backgroundColor: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else if (fetchStatus === ApiCallState.FETCH_ERROR) {
    return <ErrorPage />;
  }
  return (
    <div className={classes.mainContainer}>
      <div className={classes.filters}>filters</div>
      <div className={classes.searchResult}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>
          Choose the best offer for{' '}
          <b>{data.length > 0 && data[0].productName}</b>
        </Typography>
        {data.map((item) => (
          <ItemComparisonCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default ComparePricesPage;
