import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { ComparisonItem } from '../../common/types';
import { stringToUrl } from '../../utils/functions/stringToUrlValue';

type Props = {
  item: ComparisonItem;
};

type PageProps = {
  itemId: string;
};

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    margin: '10px',
  },
  shopInfo: {
    marginleft: '5px',
    flex: '1 1 35%',
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '100%',
  },
  image: { maxWidth: '50%', maxHeight: '127.38px', borderRadius: '5px' },
  productInfo: {
    flex: '1 1 35%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  price: {
    flex: '1 1 15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    flex: '1 1 15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1 1 50%',
    justifyContent: 'center',
  },
  card: {
    marginBottom: '10px',
  },
}));

const ItemComparisonCard: React.FC<Props> = ({ item }) => {
  const {
    shopName,
    shopImageUrl,
    reviewCount,
    rating,
    itemImageUrl,
    price,
    productName,
    shopAddress,
  } = item;
  const classes = useStyles();
  const { itemId } = useParams<PageProps>();
  const history = useHistory();

  return (
    <Card
      className={classes.card}
      onClick={() =>
        history.push(
          `/store/${stringToUrl(shopName)}/${stringToUrl(
            shopAddress
          )}/item/${stringToUrl(productName)}`
        )
      }
    >
      <CardActionArea>
        <Typography variant="h5" style={{ fontWeight: 'bold', margin: '10px' }}>
          {shopName}
        </Typography>
        <div className={classes.listItem}>
          <div className={classes.shopInfo}>
            <CardMedia
              style={{ flex: '1 1 50%' }}
              className={classes.image}
              component="img"
              image={shopImageUrl}
              alt="shop"
            />
            <div className={classes.rating}>
              <Rating value={rating} readOnly precision={0.5} />
              {reviewCount} reviews
            </div>
          </div>
          <div className={classes.productInfo}>
            <CardMedia
              component="img"
              image={itemImageUrl}
              className={classes.image}
              style={{ objectFit: 'contain' }}
            />
            <Typography style={{ fontWeight: 'bold' }}>
              {productName}
            </Typography>
          </div>
          <div className={classes.price}>
            <Typography style={{ color: 'green', fontWeight: 'bold' }}>
              {price} PLN
            </Typography>
          </div>
          <div className={classes.actionButton}>
            <Button variant="outlined" style={{ border: '2px solid green' }}>
              <b>Go to the&nbsp;product</b>
            </Button>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default ItemComparisonCard;
