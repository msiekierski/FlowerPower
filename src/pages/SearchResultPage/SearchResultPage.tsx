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
import { callbackify } from 'util';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    marginTop: theme.spacing(3),
    position: 'absolute',
    gap: '20px',
    left: 0,
    marginLeft: '16px',
    width: 'calc(100% - 16px - 20px)',
  },
  filters: {
    flex: '1 1 30%',
    height: 'auto',
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

export type PageResult = {
  products: Array<SearchResultItem>;
  shops: Array<FlowerShopPreviewCardProps>;
};

const SearchResultPage = () => {
  let query = useQuery();
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isLoading, isError, fetchData, filters } = useSelector(
    (root: RootState) => root.search
  );
  const { categoryFilters } = filters;
  const { fetchSearchDataByPhrase, fetchSearchDataByItem } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    if (query.get('phrase')) {
      fetchSearchDataByPhrase(query.get('phrase')!);
    } else if (query.get('item')) {
      fetchSearchDataByItem(query.get('item')!);
    }
  }, [query.get('phrase'), query.get('item')]);

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
    console.log('products!');
    console.log(products);
    return products.filter((product) =>
      activeSubcategories.includes(product.subcategory)
    );
  };

  const filterData = (): Array<SearchResultItem> => {
    let currentData = fetchData.products;
    currentData = filterByCategory(currentData);
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
              Products({fetchData.products.length})
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
