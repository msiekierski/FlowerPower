import {
  Backdrop,
  Button,
  CardMedia,
  CircularProgress,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BsArrowRight } from 'react-icons/bs';
import {
  ApiCallState,
  CartProduct,
  FlowerShopProduct,
} from '../../common/types';
import ErrorPage from '../ErrorPage/ErrorPage';
import axios from 'axios';
import { urlToString } from '../../utils/functions/urlToString';
import apiFlowerShopProductToState from '../../utils/objectMapping/apiFlowerShopProductToState';
import { FcCheckmark } from 'react-icons/fc';
import { TabPanel } from '@material-ui/lab';
import { FormControl, FormHelperText } from '@mui/material';
import AddCartItemDialog from '../../components/AddCartItemDialog/AddCartItemDialog';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/cart';

type ParamsProps = {
  itemName: string;
  shopName: string;
  shopAddress: string;
};

const useStyles = makeStyles((theme) => ({
  header: {
    maginTop: theme.spacing(3),
    width: '100%',
    display: 'flex',
  },
  categoryNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  mainContainer: {
    display: 'flex',
    gap: '25%',
    marginTop: '5%',
  },
  image: {
    flex: '1 1 40%',
    height: '30vh',
  },
  options: {
    flex: '1 1 60%',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
  pickers: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '15px',
    rowGap: '10px',
    marginTop: '10px',
  },
  tabContent: {
    marginTop: '10px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
  },
}));

const getApiUrl = (
  shopName: string,
  shopAddress: string,
  productName: string
) => {
  return `${process.env.REACT_APP_API_ADDRESS}flowerPower/customer/shop/product/${shopName}/${shopAddress}/${productName}`;
};

type SelectedOptions = {
  color: string;
  size: string;
};

const ProductPage = () => {
  const { itemName, shopName, shopAddress } = useParams<ParamsProps>();
  const [fetchStatus, setFetchStatus] = useState<ApiCallState>(
    ApiCallState.IDLE
  );
  const [items, setItems] = useState<Array<FlowerShopProduct>>([]);
  const uniqueColors = Array.from(new Set(items.map((item) => item.color)));
  const uniqueSizes = Array.from(
    new Set(items.map((item) => item.size !== undefined && item.size))
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    color: '',
    size: '',
  });
  const [tabValue, setTabValue] = useState<number>(0);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const { addItem } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const index = items.findIndex((item) => {
      const color =
        item.color !== null && item.color !== undefined ? item.color : '';
      const size =
        item.size !== null && item.size !== undefined ? item.size : '';
      return (
        color.toLowerCase() === selectedOptions.color.toLowerCase() &&
        size.toLowerCase() === selectedOptions.size.toLowerCase()
      );
    });
    if (selectedItemIndex > 0) {
      setSelectedItemIndex(index);
    }
  }, [selectedOptions]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleColorButtonClick = (color: string) => {
    if (selectedOptions.color !== color) {
      setSelectedOptions({ ...selectedOptions, color });
      setSelectedItemIndex(
        Math.max(
          0,
          items.findIndex((item) => item.color === color)
        )
      );
    }
  };

  const handleTabChange = (event: object, value: any) => {
    setTabValue(value);
  };

  const handleSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOptions({
      ...selectedOptions,
      size: event.target.value as string,
    });
  };

  const getDetails = (item: FlowerShopProduct) => {
    let details: Array<string> = [];
    if (item.color !== null && item.color !== undefined) {
      details = [...details, item.color];
    }
    if (item.size !== null && item.size !== undefined) {
      details = [...details, item.size];
    }
    return `(${details.join(',')})`;
  };

  const handleAddClick = () => {
    const cartProduct: CartProduct = {
      productId: items[selectedItemIndex].productId,
      productImageUrl: items[selectedItemIndex].imageUrl,
      itemDescription:
        items[selectedItemIndex].description +
        `${getDetails(items[selectedItemIndex])}`,
      storeName: urlToString(shopName),
      itemPrice: items[selectedItemIndex].price,
      quantity: 1,
    };
    addItem(cartProduct);
    setShowDialog(true);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        getApiUrl(
          urlToString(shopName),
          urlToString(shopAddress),
          urlToString(itemName)
        )
      );
      const mappedData = data.productsModel.map((obj: any) =>
        apiFlowerShopProductToState(obj)
      );
      const sizes = Array.from(
        new Set(
          mappedData.map((item: any) => item.size !== undefined && item.size)
        )
      );
      setItems(mappedData);
      setSelectedOptions({ ...selectedOptions, color: mappedData[0].color });
      if (sizes.length > 0 && sizes[0] !== null) {
        setSelectedOptions({ ...selectedOptions, size: sizes[0] as string });
      }
      setFetchStatus(ApiCallState.FETCH_SUCCESS);
    } catch (e) {
      setFetchStatus(ApiCallState.FETCH_ERROR);
    }
  };

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
      <AddCartItemDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        product={{
          ...items[selectedItemIndex],
          size:
            selectedOptions.size.length > 0 ? selectedOptions.size : undefined,
        }}
      />
      {/* <div className={classes.header}>
        <div className={classes.categoryNav}>
          <Typography>Category</Typography>
          <BsArrowRight />
          <Typography>Subcategory</Typography>
        </div>
      </div> */}
      <div className={classes.mainContainer}>
        <div className={classes.image}>
          <CardMedia
            component="img"
            src={items[selectedItemIndex].imageUrl}
            style={{ maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className={classes.options}>
          <Typography variant="h3" style={{ fontWeight: 'bold' }}>
            {items[0].description}
          </Typography>
          <div>
            <Typography variant="h4">Colors</Typography>
            <div className={classes.pickers}>
              {uniqueColors.map((color, index) => (
                <Button
                  key={index}
                  style={{ border: `2px solid ${color!.toLocaleLowerCase()}` }}
                  variant="outlined"
                  onClick={() => handleColorButtonClick(color!)}
                  endIcon={selectedOptions.color === color! && <FcCheckmark />}
                >
                  <Typography>{color}</Typography>
                </Button>
              ))}
            </div>
          </div>
          {uniqueSizes.length > 0 && uniqueSizes[0] !== null && (
            <div>
              <Typography variant="h4">Sizes</Typography>

              {/* <Select
                value={selectedOptions.size}
                label="size"
                onChange={handleSizeChange}
              >
                {uniqueSizes.map((size) => (
                  <MenuItem value={size.toString()}>{size}</MenuItem>
                ))}
              </Select> */}
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    variant="outlined"
                    value={selectedOptions.size}
                    label="Size"
                    onChange={handleSizeChange}
                  >
                    {uniqueSizes.map((size) => (
                      <MenuItem value={size.toString()}>{size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          )}

          <div className={classes.footer}>
            <Typography variant="h4">
              {items[selectedItemIndex].price} PLN
            </Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: 'green', width: '40%' }}
              onClick={() => handleAddClick()}
            >
              <b>Add to the cart</b>
            </Button>
          </div>
        </div>
      </div>
      <Paper square>
        <Tabs
          variant="fullWidth"
          value={tabValue}
          indicatorColor="secondary"
          onChange={handleTabChange}
        >
          <Tab label="Description" />
          {items[selectedItemIndex].composition && <Tab label="Composition" />}
        </Tabs>
      </Paper>
      <div className={classes.tabContent}>
        {tabValue === 0 && (
          <Typography>{items[selectedItemIndex].longDescription}</Typography>
        )}
        {tabValue === 1 && (
          <Typography>{items[selectedItemIndex].composition}</Typography>
        )}
      </div>
    </>
  );
};

export default ProductPage;
