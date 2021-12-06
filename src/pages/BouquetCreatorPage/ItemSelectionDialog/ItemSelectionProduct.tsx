import {
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import AddIcon from '@mui/icons-material/Add';
import Carousel from 'react-material-ui-carousel';
import { FlowerShopProduct } from '../../../common/types';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '10px',
    height: '400px',
    width: '200px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '340px',
    gap: '10px',
    width: '100%',
  },
  addIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '200px',
  },
}));

type Props = {
  shopItems: Array<FlowerShopProduct>;
  addProduct: (item: FlowerShopProduct) => void;
};

const ItemSelectionProduct: React.FC<Props> = ({ shopItems, addProduct }) => {
  const classes = useStyles();

  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  const getDetails = (item: FlowerShopProduct) => {
    if (item.subcategory === 'Flowers') {
      return `(${item.color})`;
    }
  };

  const handleAddClick = (index: number) => {
    addProduct(shopItems[index]);
  };

  return (
    <>
      <Carousel
        indicators={false}
        autoPlay={false}
        onChange={(now?: number, previous?: number) => setSelectedItemId(now!)}
        className={classes.mainContainer}
      >
        {shopItems.map((item, index) => (
          <>
            <CardActionArea className={classes.item}>
              <CardMedia
                component="img"
                src={item.imageUrl}
                alt="alt"
                style={{
                  objectFit: 'fill',
                  height: '200px',
                  width: '200px',
                }}
              />
              <Typography style={{ fontWeight: 'bold' }} align="center">
                {item.description}
              </Typography>
              <Typography align="center"> {getDetails(item)}</Typography>
              <Typography style={{ color: 'green' }}>
                {item.price} PLN
              </Typography>
            </CardActionArea>
            <div
              className={classes.addIcon}
              onClick={() => handleAddClick(index)}
            >
              <AddIcon />
              <Typography style={{ fontWeight: 'bold' }}>
                Add to bouquet
              </Typography>
            </div>
          </>
        ))}
      </Carousel>
    </>
  );
};

export default ItemSelectionProduct;
