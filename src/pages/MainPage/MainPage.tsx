import { makeStyles } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import FlowerShopPreviewCard, {
  FlowerShopPreviewCardProps,
} from '../../components/FlowerShopPreviewCard/FlowerShopPreviewCard';
import Menu from '../../components/Menu/Menu';
import CarouselItem from './CarouselItem/CarouselItem';

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    marginTop: '3%',
  },
  flowerShopsContainer: {
    marginTop: '2.5%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridRowGap: '1rem',
    gridColumnGap: '1rem',
  },
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    flowerShopsContainer: {
      gridTemplateColumns: '1fr',
    },
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
    address: 'jebacdisa.pl',
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
      <div className={classes.flowerShopsContainer}>
        {kwiaciarnie.map((kwiaciarnia, index) => {
          return <FlowerShopPreviewCard key={index} {...kwiaciarnia} />;
        })}
      </div>
    </>
  );
};

export default MainPage;
