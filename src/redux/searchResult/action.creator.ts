import { Dispatch } from 'react';
import { PageResult } from '../../pages/SearchResultPage/SearchResultPage';
import { ActionType } from './action.types';
import { Action } from './search.actions';
import axios from 'axios';
import apiSearchPhraseProductToState from '../../utils/objectMapping/apiSearchPhraseProductToState';
import apiShopListToState from '../../utils/objectMapping/apiShopListToState';

const getApiUrl = (name: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/search/${name}`;

const getApiUrlCategory = (category: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/categoryFilter/${category}`;

export const fetchSearchDataByPhrase = (name: string, city: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const onSuccess = (data: PageResult) => {
      dispatch({ type: ActionType.FETCH_SUCCESS, payload: data });
    };
    const onError = () => {
      dispatch({ type: ActionType.FETCH_ERORR });
    };
    dispatch({ type: ActionType.FETCH_BEGIN });
    try {
      const { data } = await axios.get(getApiUrl(name), {
        params: { city: 'Wroclaw' },
      });
      onSuccess({
        products: data.products.map((obj: any) =>
          apiSearchPhraseProductToState(obj)
        ),
        shops: data.shops.map((obj: any) => apiShopListToState(obj)),
      });
    } catch (e) {
      onError();
    }
  };
};

export const fetchSearchDataByItem = (name: string, city: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const onSuccess = (data: PageResult) => {
      dispatch({ type: ActionType.FETCH_SUCCESS, payload: data });
    };
    const onError = () => {
      dispatch({ type: ActionType.FETCH_ERORR });
    };
    dispatch({ type: ActionType.FETCH_BEGIN });
    try {
      const { data } = await axios.get(getApiUrl(name), {
        params: { city: 'Wroclaw' },
      });
      onSuccess({
        products: data.products.map((obj: any) =>
          apiSearchPhraseProductToState(obj)
        ),
        shops: [],
      });
    } catch (e) {
      onError();
    }
  };
};

export const fetchSearchDataByCategory = (category: string, city: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const onSuccess = (data: PageResult) => {
      dispatch({ type: ActionType.FETCH_SUCCESS, payload: data });
    };
    const onError = () => {
      dispatch({ type: ActionType.FETCH_ERORR });
    };
    dispatch({ type: ActionType.FETCH_BEGIN });
    try {
      const { data } = await axios.get(getApiUrlCategory(category), {
        params: { city: 'Wroclaw' },
      });
      onSuccess({
        products: data.map((obj: any) => apiSearchPhraseProductToState(obj)),
        shops: [],
      });
    } catch (e) {
      onError();
    }
  };
};

export const changeCategoryFilter = (
  category: string,
  subcategory: string,
  newValue: boolean
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CHANGE_CATEGORY_FILTER_VALUE,
      payload: { category, subcategory, newValue },
    });
  };
};

export const removeFilterColor = (color: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.REMOVE_FILTER_COLOR, payload: color });
  };
};

export const addFilterColor = (color: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.ADD_FILTER_COLOR, payload: color });
  };
};

export const clearReducer = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CLEAR });
  };
};
