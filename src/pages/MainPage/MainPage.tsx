import { makeStyles } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import Menu from "../../components/Menu/Menu";
import CarouselItem from "./CarouselItem/CarouselItem";

const useStyles = makeStyles(() => ({
  carouselContainer: {
    marginTop: "3%",
  },
}));

const MainPage = () => {
  const classes = useStyles();
  return (
    <>
      <Menu />
      <div className={classes.carouselContainer}>
        <Carousel>
          {[1, 2, 3, 4].map((item, i) => (
            <CarouselItem
              key={i}
              imageSource={`http://127.0.0.1:8887/carouselImages/image${item}.jpg`}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default MainPage;
