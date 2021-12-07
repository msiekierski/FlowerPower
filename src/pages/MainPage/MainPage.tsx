import { makeStyles, Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import FlowerShopPreviewCard, {
  FlowerShopPreviewCardProps,
} from '../../components/FlowerShopPreviewCard/FlowerShopPreviewCard';
import Menu from '../../components/Menu/Menu';
import CarouselItem from './CarouselItem/CarouselItem';
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import apiShopListToState from '../../utils/objectMapping/apiShopListToState';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import normalizeString from '../../utils/functions/normalizeString';

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    marginTop: '3%',
  },
  flowerShopsContainer: {
    display: 'flex',
    overflowX: 'auto',
  },
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    flowerShopsContainer: {
      display: 'flex',
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none' /* IE and Edge */,
      'scrollbar-width': 'none' /* Firefox */,
    },
  },
  promotedStores: {
    marginTop: '20px',
    position: 'relative',
  },
  leftScrollIcon: {
    fontSize: '3rem',
    zIndex: 1000,
    position: 'absolute',
    left: '5%',
    top: '50%',
    opacity: '0.5',
  },
  rightScrollIcon: {
    position: 'absolute',
    right: '5%',
  },
}));

const MainPage = () => {
  const classes = useStyles();

  const [recommendedShops, setRecomenndedShops] = useState<
    Array<FlowerShopPreviewCardProps>
  >([]);

  const { user, location } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    fetchShops();
  }, [location.city]);

  const fetchShops = async () => {
    let city = 'Wroclaw';
    if (location && location.city) {
      city = location.city;
    }
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}flowerPower/customer/get/shopList`,
        { params: { city: normalizeString(city) } }
      );
      setRecomenndedShops(data.map((data: any) => apiShopListToState(data)));
    } catch (e) {}
  };

  const carouselLinks: Array<string> = [
    'https://lh3.googleusercontent.com/pw/AM-JKLUb_Sie65XgLQ4V0lnZaUDU46dYEPa-WvDYViMycC3qzmPaLTegA9vjC7lYrmOOdgfDV2eLZNLTnyDEDoEO73sMN3_4ARYzFl9k7X7hKjSei60IS8v4d4Tpzrpk4POS_iWMSKOiBi9jpqpanPXRqHzD=w800-h533-no',
    'https://lh3.googleusercontent.com/pw/AM-JKLUCaColsFBNZ0Xwm0AtCMDNkAoN6Nzl8j8vSjNNf_ShI4yoWkN4Thqg-15IdUfcqIT4OV_-JRhhxCXO1RNyRMjulEpQ6R8sp74DtEXnVLPXI_8RBVdfz7_ApVwPU9itRWXaZ4pVxLFU7Y4wiICezJU=w967-h725-no',
    'https://lh3.googleusercontent.com/pw/AM-JKLV8DIV7j55_G_Pn-fj5jvENZ73GCBsXAp3KRNGAsP-eStp9el8bqTPfS7ziQjXyuIABFQw1pWPovtPEIrf4fj0X-5qgji06SoUd0htUqJ1UPn40sOw9_U1ED7B2P8kCAhFLkGVwfPWiF_YpRzPCGznI=w1200-h736-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/AM-JKLUe-cbIlBZBYF3x-MeB2_N96GOsoKaMlRW9es3Mdia_XW8TCXsXK7XPP6YvxuY5vmOVLBDY_p5pDB8_7FAe6WaQebS0EyXDrAyPJqK2AIielWiOqc2HOxC8qjp4l4QzSkHjJW5rNaKwMs_k5he2iCiu=w450-h300-no?authuser=0',
  ];

  return (
    <>
      <Menu />
      <div className={classes.carouselContainer}>
        <Carousel animation="slide">
          {carouselLinks.map((item, i) => (
            <CarouselItem key={i} imageSource={item} />
          ))}
        </Carousel>
      </div>
      <div className={classes.promotedStores}>
        <Typography
          variant="h5"
          noWrap
          style={{ fontWeight: 'bold', textDecoration: 'underline' }}
        >
          Recommended Florists'
        </Typography>
        <CustomCarousel
          carouselComponents={recommendedShops.map((store, index) => (
            <FlowerShopPreviewCard key={index} {...store} />
          ))}
        />
      </div>
    </>
  );
};

export default MainPage;
