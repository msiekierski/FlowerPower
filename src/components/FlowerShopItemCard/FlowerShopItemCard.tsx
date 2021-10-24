import {
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/cart';

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
  addIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '5px',
    cursor: 'pointer',
  },
}));

const FlowerShopItemCard = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { addItem } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className={classes.mainContainer}>
      <CardActionArea className={classes.item}>
        <CardMedia
          component="img"
          image="https://www.ikea.com/nl/en/images/products/smycka-artificial-flower-rose-red__0636963_pe698124_s5.jpg"
          alt="alt"
        />
        <Typography style={{ fontWeight: 'bold' }}>Red rose</Typography>
        <Typography style={{ color: 'green' }}>7,99</Typography>
      </CardActionArea>
      <div
        className={classes.addIcon}
        onClick={() =>
          addItem({
            productId: '4123213',
            productImageUrl:
              'https://www.ikea.com/nl/en/images/products/smycka-artificial-flower-rose-red__0636963_pe698124_s5.jpg',
            itemDescription: 'description',
            storeName: 'Shop 1',
            itemPrice: 7.99,
            quantity: 1,
          })
        }
      >
        <ShoppingBasketOutlinedIcon />
        <Typography style={{ fontWeight: 'bold' }}>Add</Typography>
      </div>
    </div>
  );
};

export default FlowerShopItemCard;
