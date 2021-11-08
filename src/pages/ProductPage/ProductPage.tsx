import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';

type ParamsProps = {
  id: string;
};

const useStyles = makeStyles((theme) => ({
  itemPresentation: {
    display: 'flex',
  },
  images: {
    maxWidth: '40%',
  },
  mainContainer: {
    width: '100%',
  },
}));

const ProductPage = () => {
  const { id } = useParams<ParamsProps>();
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.images}></div>
    </div>
  );
};

export default ProductPage;
