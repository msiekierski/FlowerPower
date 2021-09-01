import { makeStyles } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import FlowerShopPreviewCard, {
  FlowerShopPreviewCardProps,
} from "../../components/FlowerShopPreviewCard/FlowerShopPreviewCard";
import Menu from "../../components/Menu/Menu";
import CarouselItem from "./CarouselItem/CarouselItem";

const useStyles = makeStyles(() => ({
  carouselContainer: {
    marginTop: "3%",
  },
  flowerShopsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridRowGap: "1rem",
    gridColumnGap: "1rem",
  },
}));

const kwiaciarnie: Array<FlowerShopPreviewCardProps> = [
  {
    name: "Kwiaciarnia1",
    address: "randomowyAdres",
    rating: 5.5,
    imagePath:
      "https://www.portel.pl/newsimg/duze/p1035/dzien-kobiet-w-kwiaciarni-romantycznej-103581.jpg",
    hasShipping: true,
  },
  {
    name: "Kwiaciarnia2",
    address: "randomowyAdres",
    rating: 4.5,
    imagePath:
      "https://www.portel.pl/newsimg/duze/p1035/dzien-kobiet-w-kwiaciarni-romantycznej-103581.jpg",
    hasShipping: false,
  },
  {
    name: "Kwiaciarnia3",
    address: "randomowyAdres",
    rating: 2.0,
    imagePath:
      "https://www.portel.pl/newsimg/duze/p1035/dzien-kobiet-w-kwiaciarni-romantycznej-103581.jpg",
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
