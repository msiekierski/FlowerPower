import { CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    width: '70px',
    height: '70px',
    margin: 'auto',
    borderRadius: '50%',
    backgroundColor: 'green',
    position: 'relative',
    border: '3px solid white',
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    transform: 'scale(0.9, 0.9)',
    margin: 'auto',
  },
  mainContainer: {
    width: 'auto',
    maxWidth: '100px',
    height: 'auto',
    cursor: 'pointer',
  },
}));

type Props = {
  name: string;
  url: any;
};

const ShopCategory: React.FC<Props> = ({ name, url }) => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.logoContainer}>
        <CardMedia
          className={classes.image}
          component="img"
          image={url}
          alt={name}
        />
      </div>
      <Typography align="center" component="div" style={{ lineHeight: '1rem' }}>
        {name}
      </Typography>
    </div>
  );
};

export default ShopCategory;
