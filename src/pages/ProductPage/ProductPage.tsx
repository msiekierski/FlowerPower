import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import ImageGallery from 'react-image-gallery';

type ParamsProps = {
  id: string;
};

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

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
      <div className={classes.images}>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
        />
      </div>
    </div>
  );
};

export default ProductPage;
