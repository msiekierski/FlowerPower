import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { bindActionCreators } from 'redux';
import { ApiCallState, FlowerShopProduct } from '../../common/types';
import { RootState } from '../../redux/root-reducer';
import { actionCreator } from '../../redux/shop';
import { urlToString } from '../../utils/functions/urlToString';
import ErrorPage from '../ErrorPage/ErrorPage';
import AddIcon from '@mui/icons-material/Add';
import ItemSelectionDialog from './ItemSelectionDialog/ItemSelectionDialog';
import BouquetProduct from './BouquetProduct';
import { IoIosReturnLeft } from 'react-icons/io';
import { actionCreators } from '../../redux/cart';

type PageParams = {
  shopName: string;
  shopAddress: string;
};

const useStyles = makeStyles((theme) => ({
  selectedItems: {
    padding: '20px',
    width: '100%',
    minHeight: '200px',
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid silver',
    justifyContent: 'start',
    gap: '15px',
    borderRadius: '15px',
    marginBottom: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3%',
    marginTop: theme.spacing(3),
  },
  title: {
    fontWeight: 'bold',
  },
  iconItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',
    cursor: 'pointer',
  },
  iconLabel: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  addNew: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '15px',
  },
}));

const BouquetCreatorPage = () => {
  const { shopName, shopAddress } = useParams<PageParams>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { fetchShopData, clearReducer } = bindActionCreators(
    actionCreator,
    dispatch
  );
  const { addBouquetToCart } = bindActionCreators(actionCreators, dispatch);
  const shop = useSelector((root: RootState) => root.shop);
  const { fetchStatus } = shop;

  const { products } = shop.shop.data;

  const [selectedItems, setSelectedItems] = useState<Array<FlowerShopProduct>>(
    []
  );
  const [quantity, setQuantity] = useState<Array<number>>([]);
  const [showAddItemDialog, setShowAddItemDialog] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const history = useHistory();

  const addProductToBouqet = (item: FlowerShopProduct) => {
    setSelectedItems([...selectedItems, item]);
    setQuantity([...quantity, 1]);
    setShowAddItemDialog(false);
  };

  const setQuantityForItem = (itemId: string, value: number) => {
    const itemIndex = selectedItems.findIndex(
      (item) => item.productId === itemId
    );
    if (value <= 0) {
      setSelectedItems(
        selectedItems.filter((item) => item.productId !== itemId)
      );
    } else {
      setQuantity(
        quantity.map((quant, pos) => {
          if (pos === itemIndex) {
            return value;
          } else {
            return quant;
          }
        })
      );
    }
  };

  const getItemsForCategory = (): Array<FlowerShopProduct> => {
    if (selectedCategory === 'Flowers') {
      return products.filter((product) => product.subcategory === 'Flowers');
    } else if (selectedCategory === 'Cards') {
      return products.filter((product) => product.category === 'Card');
    } else if (selectedCategory === 'Ornaments') {
      return products.filter((product) => product.category === 'Ornament');
    }
    return [];
  };

  const getTotalPrice = () => {
    let total = 0;
    selectedItems.forEach((item, index) => {
      total += item.price * quantity[index];
    });
    return total;
  };

  const addBouquet = () => {
    addBouquetToCart({
      bouquetId: Date.now().toString(),
      shopId: shop.shop.data.id,
      shopName: shop.shop.data.name,
      items: selectedItems.map((item, index) => ({
        productId: item.productId,
        productImageUrl: '',
        storeName: item.storeName!,
        itemDescription: `${item.description} (${item.color})`,
        storeId: item.storeId,
        itemPrice: item.price,
        quantity: quantity[index],
      })),
      quantity: 1,
    });
    history.push('/cart');
  };

  useEffect(() => {
    fetchShopData(urlToString(shopName), urlToString(shopAddress));
    return () => {
      clearReducer();
    };
  }, []);

  if (
    fetchStatus === ApiCallState.IDLE ||
    fetchStatus === ApiCallState.FETCH_BEGIN
  ) {
    return (
      <Backdrop open={true} style={{ backgroundColor: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (fetchStatus === ApiCallState.FETCH_ERROR) {
    return <ErrorPage />;
  }
  return (
    <>
      <ItemSelectionDialog
        isOpen={showAddItemDialog}
        onClose={() => setShowAddItemDialog(false)}
        products={getItemsForCategory()}
        addProduct={addProductToBouqet}
        category={selectedCategory}
      />
      <div className={classes.header}>
        <Typography className={classes.title} variant="h4" align="center">
          {shop.shop.data.name} - compose your own bouquet
        </Typography>
        <div className={classes.iconItem} onClick={() => history.goBack()}>
          <IoIosReturnLeft style={{ fontSize: '2rem' }} />
          <Typography className={classes.iconLabel}>RETURN</Typography>
        </div>
      </div>

      <Typography variant="h5">Flowers</Typography>
      <div className={classes.selectedItems}>
        {selectedItems.map((flower, index) => {
          if (flower.subcategory === 'Flowers') {
            return (
              <BouquetProduct
                item={flower}
                setQuantity={setQuantityForItem}
                quantity={quantity[index]}
              />
            );
          }
        })}
        <div
          className={classes.addNew}
          onClick={() => {
            setSelectedCategory('Flowers');
            setShowAddItemDialog(true);
          }}
        >
          <AddIcon /> <Typography>Add new product</Typography>
        </div>
      </div>

      <Typography variant="h5">Cards</Typography>
      <div className={classes.selectedItems}>
        {selectedItems.map((flower, index) => {
          if (flower.category === 'Card') {
            return (
              <BouquetProduct
                item={flower}
                setQuantity={setQuantityForItem}
                quantity={quantity[index]}
              />
            );
          }
        })}
        <div
          className={classes.addNew}
          onClick={() => {
            setSelectedCategory('Cards');
            setShowAddItemDialog(true);
          }}
        >
          <AddIcon /> <Typography>Add new product</Typography>
        </div>
      </div>

      <Typography variant="h5">Ornaments</Typography>
      <div className={classes.selectedItems}>
        {selectedItems.map((flower, index) => {
          if (flower.category === 'Ornament') {
            return (
              <BouquetProduct
                item={flower}
                setQuantity={setQuantityForItem}
                quantity={quantity[index]}
              />
            );
          }
        })}
        <div
          className={classes.addNew}
          onClick={() => {
            setSelectedCategory('Ornaments');
            setShowAddItemDialog(true);
          }}
        >
          <AddIcon /> <Typography>Add new product</Typography>
        </div>
      </div>
      <Typography align="right" variant="h4">
        Bouquets total cost: {getTotalPrice().toFixed(2)} PLN
      </Typography>
      <div className={classes.addToCartButton}>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          style={{ minWidth: '20vw' }}
          onClick={() => addBouquet()}
        >
          Add to the cart
        </Button>
      </div>
    </>
  );
};

export default BouquetCreatorPage;
