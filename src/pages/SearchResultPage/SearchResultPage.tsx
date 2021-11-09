import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ApiCallState, SearchResultItem } from '../../common/types';
import FlowerShopPreviewCard, {
  FlowerShopPreviewCardProps,
} from '../../components/FlowerShopPreviewCard/FlowerShopPreviewCard';
import SearchResultProduct from '../../components/SearchResultProduct/SearchResultProduct';
import useQuery from '../../utils/customHooks/useQuery';
import axios from 'axios';
import apiSearchPhraseProductToState from '../../utils/objectMapping/apiSearchPhraseProductToState';
import apiShopListToState from '../../utils/objectMapping/apiShopListToState';
import ErrorPage from '../ErrorPage/ErrorPage';

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
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '20px',
    columnGap: '10px',
  },
  shops: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
}));

type PageResult = {
  products: Array<SearchResultItem>;
  shops: Array<FlowerShopPreviewCardProps>;
};

const getApiUrl = (name: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/search/${name}`;

const SearchResultPage = () => {
  let query = useQuery();
  const classes = useStyles();
  const [fetchStatus, setFetchStatus] = useState<ApiCallState>(
    ApiCallState.IDLE
  );
  const [data, setData] = useState<PageResult>({ products: [], shops: [] });

  useEffect(() => {
    if (query.get('phrase')) {
      fetchDataPhrase();
    } else if (query.get('item')) {
      fetchDataItem();
    }
  }, [query.get('phrase'), query.get('item')]);

  const fetchDataPhrase = async () => {
    try {
      setFetchStatus(ApiCallState.FETCH_BEGIN);
      const { data } = await axios.get(getApiUrl(query.get('phrase')!), {
        params: { city: 'Wroclaw' },
      });
      setData({
        products: data.products.map((obj: any) =>
          apiSearchPhraseProductToState(obj)
        ),
        shops: data.shops.map((obj: any) => apiShopListToState(obj)),
      });
      setFetchStatus(ApiCallState.FETCH_SUCCESS);
    } catch (e) {
      setFetchStatus(ApiCallState.FETCH_ERROR);
    }
  };

  const fetchDataItem = async () => {
    try {
      setFetchStatus(ApiCallState.FETCH_BEGIN);
      const { data } = await axios.get(getApiUrl(query.get('item')!), {
        params: { city: 'Wroclaw' },
      });
      setData({
        products: data.products.map((obj: any) =>
          apiSearchPhraseProductToState(obj)
        ),
        shops: [],
      });
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
  }
  if (fetchStatus === ApiCallState.FETCH_ERROR) {
    return <ErrorPage />;
  }
  return (
    <div className={classes.mainContainer}>
      <div className={classes.filters}>filters</div>

      <div className={classes.searchResult}>
        {data.products.length > 0 && (
          <>
            <Typography variant="h4">Products</Typography>
            <div className={classes.items}>
              {data.products.map((item) => (
                <SearchResultProduct item={item} key={item.itemId} />
              ))}
            </div>
          </>
        )}
        {data.shops.length > 0 && (
          <>
            <Typography
              variant="h4"
              style={{ marginTop: '30px', marginBottom: '10px' }}
            >
              Stores
            </Typography>
            <div className={classes.shops}>
              {data.shops.map((store, index) => (
                <FlowerShopPreviewCard
                  {...store}
                  key={index}
                  fullWidth={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
