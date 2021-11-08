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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '10px',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '150px',
    maxHeight: '300px',
  },
}));

type Props = {
  item: SearchResultItem;
};

const SearchResultProduct: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const history = useHistory();
  const { name, itemId, minPrice, imageUrl } = item;
  return (
    <div className={classes.mainContainer}>
      <CardActionArea className={classes.item}>
        <CardMedia component="img" image={imageUrl} alt="alt" />
        <Typography style={{ fontWeight: 'bold' }} align="center">
          {name}
        </Typography>
        <Typography style={{ color: 'green' }}>{minPrice}+ PLN</Typography>
      </CardActionArea>
      <Button
        variant="contained"
        onClick={() => history.push(`/compare/item/${itemId}`)}
      >
        Compare Prices
      </Button>
    </div>
  );
};

export default SearchResultProduct;
