import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Typography,
  Divider,
} from '@material-ui/core';
import { useEffect } from 'react';
import { SearchResultItem } from '../../common/types';
import FlowerShopPreviewCard, {
  FlowerShopPreviewCardProps,
} from '../../components/FlowerShopPreviewCard/FlowerShopPreviewCard';
import SearchResultProduct from '../../components/SearchResultProduct/SearchResultProduct';
import useQuery from '../../utils/customHooks/useQuery';
import ErrorPage from '../ErrorPage/ErrorPage';
import SearchResultFilters from '../../components/SearchResultFilters/SearchResultFilters';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/searchResult';
import normalizeString from '../../utils/functions/normalizeString';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'inline-grid',
    gridTemplateColumns: '2fr 5fr',
    marginTop: theme.spacing(3),
    position: 'absolute',
    left: '16px',
    justifyContent: 'space-between',
  },
  filters: {
    paddingRight: '5vw',
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
    height: 'auto',
  },
  searchResult: { margin: '0 2.5vw' },
  items: {
    alignSelf: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    rowGap: '20px',
    columnGap: '10px',
  },
  shops: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
}));

export type PageResult = {
  products: Array<SearchResultItem>;
  shops: Array<FlowerShopPreviewCardProps>;
};

const SearchResultPage = () => {
  let query = useQuery();
  const classes = useStyles();

  const dispatch = useDispatch();
  const state = useSelector((root: RootState) => root);
  const { isLoading, isError, fetchData, filters } = state.search;
  const { categoryFilters, colorFilters } = filters;
  const { city } = state.user.location;
  const {
    fetchSearchDataByPhrase,
    fetchSearchDataByItem,
    fetchSearchDataByCategory,
    clearReducer,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (query.get('phrase')) {
      fetchSearchDataByPhrase(query.get('phrase')!, normalizeString(city));
    } else if (query.get('item')) {
      fetchSearchDataByItem(query.get('item')!, normalizeString(city));
    } else if (query.get('category')) {
      fetchSearchDataByCategory(query.get('category')!, normalizeString(city));
    }
    return () => {
      clearReducer();
    };
  }, [query.get('phrase'), query.get('item'), query.get('category'), city]);

  const filterByCategory = (
    products: Array<SearchResultItem>
  ): Array<SearchResultItem> => {
    let activeSubcategories: Array<string> = [];
    Object.keys(categoryFilters).forEach((category) => {
      Object.keys(categoryFilters[category]).forEach((subcategory) => {
        if (categoryFilters[category][subcategory] === true) {
          activeSubcategories = [...activeSubcategories, subcategory];
        }
      });
    });
    return products.filter((product) =>
      activeSubcategories.includes(product.subcategory)
    );
  };

  const filterByColors = (
    products: Array<SearchResultItem>
  ): Array<SearchResultItem> => {
    return products.filter((product) => colorFilters.includes(product.color!));
  };

  const filterData = (): Array<SearchResultItem> => {
    let currentData = fetchData.products;
    currentData = filterByCategory(currentData);
    currentData = filterByColors(currentData);
    return currentData;
  };

  if (isLoading) {
    return (
      <Backdrop open={true} style={{ backgroundColor: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <div className={classes.mainContainer}>
      <div className={classes.filters}>
        <SearchResultFilters />
        <Divider />
      </div>

      <div className={classes.searchResult}>
        {filterData().length > 0 && (
          <>
            <Typography variant="h4">
              Products({filterData().length})
            </Typography>
            <div className={classes.items}>
              {filterData().map((item) => (
                <SearchResultProduct item={item} key={item.itemId} />
              ))}
            </div>
          </>
        )}
        {fetchData.shops.length > 0 && (
          <>
            <Typography
              variant="h4"
              style={{ marginTop: '30px', marginBottom: '10px' }}
            >
              Stores({fetchData.shops.length})
            </Typography>
            <div className={classes.shops}>
              {fetchData.shops.map((store, index) => (
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
