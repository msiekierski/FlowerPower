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

const useStyle = makeStyles({
  container: {
    display: 'flex',
    columnGap: '5%',
    flex: 1,
  },
  shopImage: {
    width: '40%',
    order: 1,
  },
  details: {
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    order: 2,
    justifyContent: 'space-between',
  },
  address: {
    marginBottom: '1rem',
  },
  shippingIcon: {
    order: 3,
    fontSize: '2.5em',
  },
});

export type FlowerShopPreviewCardProps = {
  name: string;
  address: string;
  rating: number;
  imagePath: string;
  hasShipping: boolean;
};

const FlowerShopPreviewCard = ({
  name,
  address,
  rating,
  imagePath,
  hasShipping,
}: FlowerShopPreviewCardProps) => {
  const classes = useStyle();
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <div className={classes.container}>
            <img
              className={classes.shopImage}
              src={imagePath}
              alt={`${name} flower shop`}
            />
            <div className={classes.details}>
              <div>
                <Typography variant="h6">{name}</Typography>
                <Rating value={rating} readOnly precision={0.5} />
              </div>
              <span className={classes.address}>{address}</span>
            </div>
            {hasShipping && (
              <LocalShippingTwoToneIcon className={classes.shippingIcon} />
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FlowerShopPreviewCard;
