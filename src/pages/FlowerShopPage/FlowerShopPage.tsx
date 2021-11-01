import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
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

type FlowerShopPageParams = {
  shopName: string;
  shopAddress: string;
};

enum FetchStatus {
  LOADING = 'loading',
  FETCH_SUCCESS = 'fetch_success',
  FETCH_FAILED = 'fetch_failed',
}

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
}));

const categories: Array<ShopCategory> = [
  { name: 'Flowers', url: flowers },
  { name: 'Bunches', url: bunches },
  { name: 'Flowers in a vase', url: vase },
  { name: 'Flowers in a box', url: box },
  { name: 'Flowers in the basket', url: basket },
  { name: 'Pots', url: pots },
  { name: 'Seeds', url: seeds },
  { name: 'Cards', url: cards },
  { name: 'Ornaments', url: ornaments },
];

const getUrl = (name: string, address: string) => {
  return `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/shop/${name}/${address}`;
};

const FlowerShopPage = () => {
  const { shopName, shopAddress } = useParams<FlowerShopPageParams>();
  const [status, setStatus] = useState<ApiCallState>(ApiCallState.IDLE);
  const classes = useStyles();
  const [data, setData] = useState<FlowerShop>({
    name: '',
    street: '',
    city: '',
    hasDelivery: false,
    phone: '',
    reviews: [],
    products: [],
    openingHours: [],
  });
  const { name, street, city, hasDelivery, phone, reviews, openingHours } =
    data;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setStatus(ApiCallState.FETCH_BEGIN);
      const response = await axios.get(
        getUrl(urlToString(shopName), urlToString(shopAddress))
      );
      console.log(response.data);
      setData(apiShopPageToState(response.data));
      setStatus(ApiCallState.FETCH_SUCCESS);
    } catch (e) {
      console.log(e);
      setStatus(ApiCallState.FETCH_ERROR);
    }
  };

  if (status === ApiCallState.IDLE || status === ApiCallState.FETCH_BEGIN) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (status === ApiCallState.FETCH_ERROR) {
    return <ErrorPage />;
  }
  return (
    <>
      <Container>
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
            <Typography>{phone}</Typography>
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
              image="https://www.kanlux.com/storage/realizacje/18703_1.jpg"
              alt="shop1"
            />
          </Grid>
          <Grid item xs={6}>
            <CardMedia
              height="100%"
              component="img"
              image="https://www.portel.pl/newsimg/duze/p1035/dzien-kobiet-w-kwiaciarni-romantycznej-103581.jpg"
              alt="shop2"
            />
          </Grid>
          <Grid item xs={3}>
            <CardMedia
              height="100%"
              component="img"
              image="https://kwiaciarnialubon.com.pl/wp-content/uploads/2020/03/start-1.jpg"
              alt="shop3"
            />
          </Grid>
        </Grid>
        <div className={classes.categories}>
          {categories.map((category, index) => (
            <ShopCategoryImage key={index} {...category} />
          ))}
        </div>
        <div>
          <FlowerShopItemCard />
        </div>
      </Container>
    </>
  );
};

export default FlowerShopPage;
