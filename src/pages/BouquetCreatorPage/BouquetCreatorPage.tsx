import {
  Backdrop,
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
}));

const BouquetCreatorPage = () => {
  const { shopName, shopAddress } = useParams<PageParams>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { fetchShopData, clearReducer } = bindActionCreators(
    actionCreator,
    dispatch
  );
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
    </>
  );
};

export default BouquetCreatorPage;
