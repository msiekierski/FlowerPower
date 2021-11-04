import { CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = (props: StyleProps) =>
  makeStyles((theme) => ({
    logoContainer: {
      width: '70px',
      height: '70px',
      margin: 'auto',
      borderRadius: '50%',
      backgroundColor: 'green',
      position: 'relative',
      // border: '4px solid white',
    },
    image: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      transform: 'scale(0.9, 0.9)',
      margin: 'auto',
    },
    mainContainer: {
      width: '100px',
      maxWidth: '100px',
      height: '100px',
      cursor: 'pointer',
      position: 'relative',
    },
    activated: {
      width: '80px',
      height: '80px',
      left: '10px',
      top: '-5px',
      margin: 'auto',
      position: 'absolute',
      background: props.isActive
        ? 'linear-gradient(to right, #5a3f37, #2c7744)'
        : 'white',
      borderRadius: '50%',
    },
  }));

type Props = {
  name: string;
  url: any;
  isActive: boolean;
  onClick: () => void;
};

type StyleProps = {
  isActive: boolean;
};

const ShopCategory: React.FC<Props> = ({ name, url, isActive, onClick }) => {
  const classes = useStyles({ isActive })();
  return (
    <div className={classes.mainContainer} onClick={() => onClick()}>
      <div className={classes.activated}></div>
      <div className={classes.logoContainer}>
        <CardMedia
          className={classes.image}
          component="img"
          image={url}
          alt={name}
        />
      </div>
      <Typography
        align="center"
        component="div"
        style={{ lineHeight: '1rem', marginTop: '7px' }}
      >
        {name}
      </Typography>
    </div>
  );
};

export default ShopCategory;
