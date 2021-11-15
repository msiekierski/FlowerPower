import {
  Button,
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { SearchResultItem } from '../../common/types';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '10px',
    height: '400px',
    maxWidth: '150px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '320px',
  },
}));

type Props = {
  item: SearchResultItem;
};

const SearchResultProduct: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const history = useHistory();
  const { name, itemId, minPrice, imageUrl, maxPrice, color, size } = item;
  return (
    <div className={classes.mainContainer}>
      <CardActionArea
        className={classes.item}
        onClick={() => history.push(`/compare/item/${itemId}`)}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt="alt"
          style={{ width: '100%', height: '150px', objectFit: 'fill' }}
        />
        <div>
          {color! !== 'mix' && (
            <Typography style={{ fontWeight: 'bold' }} align="center">
              {color!.charAt(0).toUpperCase() + color!.slice(1)}
            </Typography>
          )}
          <Typography style={{ fontWeight: 'bold' }} align="center">
            {name}
          </Typography>
          {size && (
            <Typography style={{ fontWeight: 'bold' }} align="center">
              ({size!})
            </Typography>
          )}
        </div>
        <Typography align="center" style={{ color: 'green' }}>
          from&nbsp;{minPrice}PLN to&nbsp;{maxPrice}PLN
        </Typography>
      </CardActionArea>
      <Button
        variant="outlined"
        style={{ border: '2px solid green' }}
        onClick={() => history.push(`/compare/item/${itemId}`)}
      >
        Compare Prices
      </Button>
    </div>
  );
};

export default SearchResultProduct;
