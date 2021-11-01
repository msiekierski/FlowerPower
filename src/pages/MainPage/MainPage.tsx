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

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    let city = 'Wroclaw';
    if (user !== null && user.city !== null) {
      city = user.city!;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:8080/flowerPower/customer/get/shopList`,
        { params: { city: city } }
      );
      setRecomenndedShops(data.map((data: any) => apiShopListToState(data)));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Menu />
      <div className={classes.carouselContainer}>
        <Carousel animation="slide">
          {[1, 2, 3, 4].map((item, i) => (
            <CarouselItem
              key={i}
              imageSource={`http://127.0.0.1:8887/carouselImages/image${item}.jpg`}
            />
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
