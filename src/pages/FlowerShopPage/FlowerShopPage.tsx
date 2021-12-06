import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Redirect, useParams } from 'react-router';
import { ApiCallState, FlowerShop, OpeningHours } from '../../common/types';
import FlowerShopReviewCard from '../../components/FlowerShopReviewCard/FlowerShopReviewCard';
import ShippingIcon from '../../utils/icons/ShippingIcon';
import CardMedia from '@mui/material/CardMedia';
import flowers from '../../resources/categoryIcons/flowers.png';
import bunches from '../../resources/categoryIcons/bunches.png';
import vase from '../../resources/categoryIcons/vase.png';
import box from '../../resources/categoryIcons/box.png';
import basket from '../../resources/categoryIcons/basket.png';
import pots from '../../resources/categoryIcons/pots.png';
import seeds from '../../resources/categoryIcons/seeds.png';
import cards from '../../resources/categoryIcons/cards.png';
import ornaments from '../../resources/categoryIcons/ornaments.jpg';
import ShopCategoryImage from '../../components/ShopCategory/ShopCategory';
import { ShopCategory } from '../../utils/constants/ShopCategories';
import FlowerShopItemCard from '../../components/FlowerShopItemCard/FlowerShopItemCard';
import OpeningStatus from '../../components/OpeningStatus/OpeningStatus';
import { urlToString } from '../../utils/functions/urlToString';
import axios from 'axios';
import apiFlowerShopProductToState from '../../utils/objectMapping/apiFlowerShopProductToState';
import apiShopPageToState from '../../utils/objectMapping/apiShopPageToState';
import ErrorPage from '../ErrorPage/ErrorPage';
import * as _ from 'lodash';
import usePagination from '../../utils/customHooks/usePagination';
import { Pagination, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreator } from '../../redux/shop';
import { RootState } from '../../redux/root-reducer';
import { GoogleMap, Marker } from 'react-google-maps';
import MyMapComponent from '../../components/MyMapComponent/MyMapComponent';

type FlowerShopPageParams = {
  shopName: string;
  shopAddress: string;
};

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      flexDirection: 'column',
      rowGap: '20px',
    },
  },
  shopInfo: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
  },
  reviewCard: {
    margin: 'atuo',
    width: 'auto',
    height: '100px',
    paddingRight: '20px',
    paddingBottom: '30px',
  },
  shopName: {
    display: 'flex',
    columnGap: '20px',
    alignItems: 'center',
  },
  rating: {
    display: 'flex',
    columnGap: '1px',
  },
  categories: {
    position: 'relative',
    top: '-30px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'start',
    columnGap: '5px',
    rowGap: '10px',
    flexWrap: 'wrap',
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '20px',
    columnGap: '10px',
  },
  pagination: {
    margin: 'auto',
    width: 'auto',
  },
}));

const categories: Array<ShopCategory> = [
  { name: 'Flowers', url: flowers, apiSubstitute: 'Flower' },
  { name: 'Flowerpots', url: pots, apiSubstitute: 'Flowerpot' },
  { name: 'Seeds', url: seeds, apiSubstitute: 'Seed' },
  { name: 'Cards', url: cards, apiSubstitute: 'Card' },
  { name: 'Ornaments', url: ornaments, apiSubstitute: 'Ornament' },
];

const FlowerShopPage = () => {
  const { shopName, shopAddress } = useParams<FlowerShopPageParams>();

  ///
  const dispatch = useDispatch();
  const { fetchShopData, setActiveCategory, setPagination, clearReducer } =
    bindActionCreators(actionCreator, dispatch);
  const root = useSelector((root: RootState) => root);
  const {
    name,
    street,
    city,
    hasDelivery,
    phone,
    reviews,
    openingHours,
    products,
    images,
    latitude,
    longitude,
  } = root.shop.shop.data;

  const { activeCategory, fetchStatus } = root.shop;

  const { pagination } = root.shop.shop;

  const { location } = root.user;

  const classes = useStyles();

  const groupFilteredProducts = () => {
    if (activeCategory.length > 0) {
      return _.groupBy(
        products.filter(
          (product) => product.category === activeCategory.slice(0, -1)
        ),
        'description'
      );
    } else {
      return _.groupBy(products, 'description');
    }
  };

  const grouped = groupFilteredProducts();

  const ITEMS_PER_PAGE = 12;
  const itemData = Object.keys(grouped);
  const _itemData = usePagination(itemData, ITEMS_PER_PAGE);
  const count = Math.ceil(itemData.length / ITEMS_PER_PAGE);

  const availableCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  useEffect(() => {
    fetchShopData(urlToString(shopName), urlToString(shopAddress));
    return () => {
      clearReducer();
    };
  }, []);

  const handlePageChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPagination(p);
    _itemData.jump(p);
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
    <>
      <div className={classes.headerContainer}>
        <div className={classes.shopInfo}>
          <div className={classes.shopName}>
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <ShippingIcon available={hasDelivery} />
          </div>
          <Typography>{street}</Typography>
          <Typography>{city}</Typography>
          <Typography>+48{phone}</Typography>
        </div>
        <div style={{ marginTop: '16px' }}>
          <OpeningStatus openingHours={openingHours} />
        </div>
      </div>
      {reviews.length > 0 && (
        <div className={classes.reviewCard}>
          <Carousel animation="slide">
            {reviews.map((review, index) => (
              <FlowerShopReviewCard key={index} {...review} />
            ))}
          </Carousel>
        </div>
      )}

      <Grid
        container
        style={{
          height: '30vh',
          marginTop: '60px',
          overflow: 'hidden',
          borderRadius: '5px',
        }}
      >
        <Grid item xs={3}>
          <CardMedia
            height="100%"
            component="img"
            src={images[0]}
            alt="shop1"
          />
        </Grid>
        <Grid item xs={6}>
          <CardMedia
            height="100%"
            component="img"
            src={images[1]}
            alt="shop2"
          />
        </Grid>
        <Grid item xs={3}>
          <CardMedia
            height="100%"
            component="img"
            src={images[2]}
            alt="shop3"
          />
        </Grid>
      </Grid>
      <div className={classes.categories}>
        {categories
          .filter((category) =>
            availableCategories.includes(category.apiSubstitute)
          )
          .map((category, index) => (
            <ShopCategoryImage
              key={index}
              {...category}
              isActive={category.name === activeCategory}
              onClick={() => {
                activeCategory === category.name
                  ? setActiveCategory('')
                  : setActiveCategory(category.name);
                _itemData.jump(1);
              }}
            />
          ))}
      </div>

      <Pagination
        count={count}
        size="large"
        page={pagination}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      />
      <div className={classes.items}>
        {_itemData.currentData().length > 0 ? (
          _itemData.currentData().map((name) => (
            <FlowerShopItemCard
              key={name}
              shopItems={grouped[name].map((item) => {
                item.description = name;
                return item;
              })}
            />
          ))
        ) : (
          <Typography align="center">No items to be displayed</Typography>
        )}
      </div>
      <Pagination
        count={count}
        size="large"
        page={pagination}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      />
      <div
        id="store-map"
        style={{ width: '100%', marginTop: '30px', marginBottom: '100px' }}
      >
        <MyMapComponent
          storeLat={latitude}
          storeLong={longitude}
          userLat={location.lat}
          userLong={location.long}
          storeName={name}
        />
      </div>
    </>
  );
};

export default FlowerShopPage;
