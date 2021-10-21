import { makeStyles, Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import FlowerShopPreviewCard, {
  FlowerShopPreviewCardProps,
} from '../../components/FlowerShopPreviewCard/FlowerShopPreviewCard';
import Menu from '../../components/Menu/Menu';
import CarouselItem from './CarouselItem/CarouselItem';
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';

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

const kwiaciarnie: Array<FlowerShopPreviewCardProps> = [
  {
    name: 'Kwiaciarnia1',
    address: 'randomowyAdres',
    rating: 5.5,
    imagePath:
      'https://www.portel.pl/newsimg/duze/p1035/dzien-kobiet-w-kwiaciarni-romantycznej-103581.jpg',
    hasShipping: true,
  },
  {
    name: 'Kwiaciarnia2',
    address: 'randomowyAdres',
    rating: 4.5,
    imagePath:
      'http://kwiaty-lotos.pl/wp-content/uploads/kwiaciarnia-lotos-witryna.jpg',
    hasShipping: false,
  },
  {
    name: 'Kwiaciarnia3',
    address: 'randomowyAdres',
    rating: 2.0,
    imagePath: 'https://tylkotorun.pl/wp-content/uploads/2020/07/plaza1.jpg',
    hasShipping: true,
  },
  {
    name: 'Kwiaciarnia4',
    address: 'randomowyAdres',
    rating: 4.0,
    imagePath:
      'https://www.kreator-kwiatow.pl/sklep/blog/wp-content/uploads/2017/10/IMG_20171005_143816_HDR-1024x768.jpg',
    hasShipping: true,
  },
  {
    name: 'Kwiaciarnia5',
    address: 'randomowyAdres',
    rating: 4.0,
    imagePath:
      'https://www.kreator-kwiatow.pl/sklep/blog/wp-content/uploads/2017/10/IMG_20171005_143816_HDR-1024x768.jpg',
    hasShipping: true,
  },
  {
    name: 'Kwiaciarnia6',
    address: 'randomowyAdres',
    rating: 4.0,
    imagePath:
      'https://www.kreator-kwiatow.pl/sklep/blog/wp-content/uploads/2017/10/IMG_20171005_143816_HDR-1024x768.jpg',
    hasShipping: true,
  },
  {
    name: 'Kwiaciarnia7',
    address: 'randomowyAdres',
    rating: 4.0,
    imagePath:
      'https://www.kreator-kwiatow.pl/sklep/blog/wp-content/uploads/2017/10/IMG_20171005_143816_HDR-1024x768.jpg',
    hasShipping: true,
  },
  {
    name: 'Kwiaciarnia8',
    address: 'randomowyAdres',
    rating: 4.0,
    imagePath:
      'https://www.kreator-kwiatow.pl/sklep/blog/wp-content/uploads/2017/10/IMG_20171005_143816_HDR-1024x768.jpg',
    hasShipping: true,
  },
  {
    name: 'Kwiaciarnia9',
    address: 'randomowyAdres',
    rating: 4.0,
    imagePath:
      'https://www.kreator-kwiatow.pl/sklep/blog/wp-content/uploads/2017/10/IMG_20171005_143816_HDR-1024x768.jpg',
    hasShipping: true,
  },
  {
    name: 'Kwiaciarnia10',
    address: 'randomowyAdres',
    rating: 4.0,
    imagePath:
      'https://www.kreator-kwiatow.pl/sklep/blog/wp-content/uploads/2017/10/IMG_20171005_143816_HDR-1024x768.jpg',
    hasShipping: true,
  },
];

const MainPage = () => {
  const classes = useStyles();
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
          carouselComponents={kwiaciarnie.map((store, index) => (
            <FlowerShopPreviewCard key={index} {...store} />
          ))}
        />
      </div>
    </>
  );
};

export default MainPage;
