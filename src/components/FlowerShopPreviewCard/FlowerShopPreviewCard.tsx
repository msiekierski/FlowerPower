import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import LocalShippingTwoToneIcon from '@material-ui/icons/LocalShippingTwoTone';

const useStyle = makeStyles((theme) => ({
  card: {
    minWidth: '220px',
  },
  container: {
    minHeight: '17vh',
    height: '50%',
    display: 'flex',
    columnGap: '5%',
    flex: 1,
    padding: '5px',
    flexDirection: 'column',
    minWidth: '100%',
    rowGap: '10%',
    justifyContent: 'center',
    alignItems: 'left',
  },
  shopImage: {
    minWidth: '100px',
    minHeight: '100px',
    width: '100%',
    order: 1,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 4,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    order: 2,
    justifyContent: 'space-between',
    margin: 0,
    marginTop: '5px',
  },
  address: {
    marginBottom: '1rem',
  },
  shippingIconDisabled: {
    order: 3,
    fontSize: '1.75em',
    position: 'relative',
    '&::after': {
      position: 'absolute',
      content: '"/"',
      color: 'red',
      fontWeight: 500,
      fontSize: '2.5em',
      left: '10.4px',
      top: '-13.7px',
      transform: 'rotate(15deg)',
    },
  },
  shippingIcon: {
    order: 3,
    fontSize: '1.75em',
    position: 'relative',
  },
  rating: {
    display: 'flex',
    columnGap: '1px',
  },
}));

export type FlowerShopPreviewCardProps = {
  name: string;
  address: string;
  rating: number;
  imagePath: string;
  hasShipping: boolean;
};

const FlowerShopPreviewCard: React.FC<FlowerShopPreviewCardProps> = ({
  name,
  address,
  rating,
  imagePath,
  hasShipping,
}: FlowerShopPreviewCardProps) => {
  const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <div className={classes.container}>
            <div
              className={classes.shopImage}
              style={{ backgroundImage: `url(${imagePath})` }}
            ></div>
            <div className={classes.details}>
              <div>
                <Typography variant="h6">{name}</Typography>
                <div className={classes.rating}>
                  <Rating value={rating} readOnly precision={0.5} />
                  <Typography>(500)</Typography>
                </div>
              </div>
              <span className={classes.address}>{address}</span>
            </div>
            <span
              className={
                hasShipping
                  ? classes.shippingIcon
                  : classes.shippingIconDisabled
              }
            >
              <LocalShippingTwoToneIcon
                className={
                  hasShipping
                    ? classes.shippingIcon
                    : classes.shippingIconDisabled
                }
              />
            </span>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FlowerShopPreviewCard;
