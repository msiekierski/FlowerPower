import { Dispatch } from 'react';
import { FlowerShop } from '../../common/types';
import { ActionType } from './action.types';
import { Action } from './shop.actions';
import axios from 'axios';
import apiShopPageToState from '../../utils/objectMapping/apiShopPageToState';

const getUrl = (name: string, address: string) => {
  return `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/shop/${name}/${address}`;
};

export const fetchShopData = (shopName: string, shopStreet: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const onSuccess = (shop: FlowerShop) => {
      dispatch({ type: ActionType.FETCH_SUCCESS, payload: shop });
    };
    const onError = () => {
      dispatch({ type: ActionType.FETCH_ERROR });
    };
    dispatch({ type: ActionType.BEGIN_FETCH });
    try {
      const response = await axios.get(getUrl(shopName, shopStreet));
      const mapped = apiShopPageToState(response.data);
      console.log(response.data);
      return onSuccess({
        ...mapped,
        products: mapped.products.map((product) => {
          product.storeName = shopName;
          return product;
        }),
      });
    } catch (e) {
      return onError();
    }
  };
};

export const setActiveCategory = (category: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_ACTIVE_CATEGORY, payload: category });
  };
};

export const setPagination = (page: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_PAGINATION, payload: page });
  };
};
