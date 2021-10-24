import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router';
import { FlowerShop } from '../../common/types';
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

type FlowerShopPageParams = {
  shopName: string;
};

const enum FetchStatus {
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
    display: 'block',
    maxWidth: '25vw',
    width: '25vw',
    height: 100,
    paddingRight: '20px',
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

const shopData: FlowerShop = {
  name: 'Flower Shop 1',
  street: 'Rynek 15',
  city: '50-210 Wroclaw',
  phone: '503-210-230',
  hasDelivery: true,
  reviews: [
    {
      text: 'An ideal place for workshops and divine flower arrangements',
      rating: 4.5,
      author: 'Anonymous',
      date: '2 days ago',
    },
    {
      text: 'Nice shop',
      rating: 5,
      author: 'Anonymous',
      date: '5 days ago',
    },
  ],
  products: [],
};

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

const FlowerShopPage = () => {
  const { shopName } = useParams<FlowerShopPageParams>();
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.LOADING);
  const classes = useStyles();
  const { name, street, city, hasDelivery, phone } = shopData;

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
          <div className={classes.reviewCard}>
            <Carousel animation="slide">
              {shopData.reviews.map((review, index) => (
                <FlowerShopReviewCard key={index} {...review} />
              ))}
            </Carousel>
          </div>
        </div>
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
              image="https://lh3.googleusercontent.com/proxy/0b1Ikn7W4lGn3LNX4RbGg4h67JYxTugBNcdSib17vXwJ-JLuGUsHa6Ng73VPPPQGIHa6QnK9PuPxlGBmpFgeDVMzw6H1aJolRiF_NgKV20unuI3OgO7w3TlNu0ZlwyafrQ16Is6yuHQ58hDqV452xJ7hYR_pMXL0cD2IhlN80RaEAQeJSxg9RA"
              alt="Paella dish"
            />
          </Grid>
          <Grid item xs={6}>
            <CardMedia
              height="100%"
              component="img"
              image="https://www.portel.pl/newsimg/duze/p1035/dzien-kobiet-w-kwiaciarni-romantycznej-103581.jpg"
              alt="Paella dish"
            />
          </Grid>
          <Grid item xs={3}>
            <CardMedia
              height="100%"
              component="img"
              image="https://kwiaciarnialubon.com.pl/wp-content/uploads/2020/03/start-1.jpg"
              alt="Paella dish"
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
