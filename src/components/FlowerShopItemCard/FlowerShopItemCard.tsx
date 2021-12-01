import {
  CardActionArea,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/cart';
import AddCartItemDialog from '../AddCartItemDialog/AddCartItemDialog';
import {
  CartProduct,
  FlowerShopProduct,
  ProductCategory,
} from '../../common/types';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Carousel from 'react-material-ui-carousel';
import { useHistory, useLocation } from 'react-router';
import { stringToUrl } from '../../utils/functions/stringToUrlValue';

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
};

const FlowerShopItemCard: React.FC<Props> = ({ shopItems }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { addItem } = bindActionCreators(actionCreators, dispatch);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  const history = useHistory();
  const location = useLocation();

  const getDetails = (item: FlowerShopProduct) => {
    if (item.subcategory === 'Flowers') {
      return `(${item.color})`;
    } else if (item.subcategory === 'Bunches') {
      return `(${item.size})`;
    }
  };

  const handleAddClick = (itemId: number) => {
    let storeName = 'unknown';
    if (shopItems[itemId].storeName !== undefined) {
      storeName = shopItems[itemId].storeName!;
    }
    const cartProduct: CartProduct = {
      productId: shopItems[itemId].productId,
      productImageUrl: shopItems[itemId].imageUrl,
      itemDescription:
        shopItems[itemId].description + `${getDetails(shopItems[itemId])}`,
      storeName: storeName,
      storeId: shopItems[itemId].storeId,
      itemPrice: shopItems[itemId].price,
      quantity: 1,
    };
    addItem(cartProduct);
    setIsDialogOpen(true);
  };

  return (
    <>
      <AddCartItemDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        product={shopItems[selectedItemId]}
      />

      <Carousel
        indicators={false}
        autoPlay={false}
        onChange={(now?: number, previous?: number) => setSelectedItemId(now!)}
        className={classes.mainContainer}
      >
        {shopItems.map((item, index) => (
          <>
            <CardActionArea
              className={classes.item}
              onClick={() =>
                history.push(
                  `${location.pathname}/item/${stringToUrl(item.description)}`
                )
              }
            >
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
              <ShoppingBasketOutlinedIcon />
              <Typography style={{ fontWeight: 'bold' }}>Add</Typography>
            </div>
          </>
        ))}
      </Carousel>
    </>
  );
};

export default FlowerShopItemCard;
