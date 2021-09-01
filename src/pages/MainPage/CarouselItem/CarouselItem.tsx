import { makeStyles, Paper } from "@material-ui/core";
import React from "react";

type CarouselItemProps = {
  imageSource: string;
};

const useStyles = makeStyles(() => ({
  card: {
    height: "300px",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },
}));

const CarouselItem = ({ imageSource }: CarouselItemProps) => {
  const classes = useStyles();
  return (
    <Paper
      className={classes.card}
      style={{
        backgroundImage: `url(${imageSource})`,
      }}
    ></Paper>
  );
};

export default CarouselItem;
