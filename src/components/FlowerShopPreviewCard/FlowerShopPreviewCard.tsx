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
import { Link } from 'react-router-dom';
import { stringToUrl } from '../../utils/functions/stringToUrlValue';

const useStyle = (props: StyleProps) =>
  makeStyles((theme) => ({
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
      flexDirection: props.fullWidth ? 'row' : 'column',
      minWidth: '100%',
      rowGap: '10%',
      justifyContent: 'center',
      alignItems: 'left',
    },
    shopImage: {
      minWidth: '100px',
      minHeight: '100px',
      order: 1,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: 4,
      width: '100%',
      height: 'auto',
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
      margin: 'auto',
      order: 3,
      fontSize: '1.75em',
      position: 'relative',
    },
    rating: {
      display: 'flex',
      columnGap: '1px',
    },
  }));

type StyleProps = {
  fullWidth: boolean;
};

export type FlowerShopPreviewCardProps = {
  name: string;
  address: string;
  zipCode: string;
  city: string;
  rating: number;
  reviewCount: number;
  imagePath: string;
  hasShipping: boolean;
  fullWidth?: boolean;
};

const FlowerShopPreviewCard: React.FC<FlowerShopPreviewCardProps> = ({
  name,
  address,
  rating,
  zipCode,
  imagePath,
  hasShipping,
  city,
  reviewCount,
  fullWidth = false,
}: FlowerShopPreviewCardProps) => {
  const classes = useStyle({ fullWidth })();

  return (
    <Card className={classes.card}>
      <Link to={`/store/${stringToUrl(name)}/${stringToUrl(address)}`}>
        <CardActionArea>
          <CardContent>
            <div className={classes.container}>
              <div
                className={classes.shopImage}
                style={{ backgroundImage: `url(${imagePath})` }}
              ></div>
              <div className={classes.details}>
                <div>
                  <Typography variant="h6" noWrap>
                    {name}
                  </Typography>
                  <div className={classes.rating}>
                    <Rating value={rating} readOnly precision={0.5} />
                    <Typography>({reviewCount})</Typography>
                  </div>
                </div>
                <span className={classes.address} style={{ marginTop: '10px' }}>
                  <Typography noWrap>{address}</Typography>
                  <Typography noWrap>
                    {zipCode} {city}
                  </Typography>
                </span>
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
      </Link>
    </Card>
  );
};

export default FlowerShopPreviewCard;
