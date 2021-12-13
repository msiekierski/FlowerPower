import { Dispatch } from 'react';
import { CartBouquet, CartProduct } from '../../common/types';
import { ActionType } from './action.types';
import { Action } from './cart.actions';

export const removeItem = (itemId: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.REMOVE_ITEM, payload: itemId });
  };
};

export const increaseQuantity = (itemId: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.INCREASE_QUANTITY, payload: itemId });
  };
};

export const decreaseQuanitity = (itemId: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.DECREASE_QUANTITY, payload: itemId });
  };
};

export const clearCart = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CLEAR_CART });
  };
};

export const addItem = (item: CartProduct) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.ADD_ITEM, payload: item });
  };
};

export const setArbitraryValue = (itemId: string, value: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_ARBITRARY_VALUE,
      payload: { id: itemId, value },
    });
  };
};

export const addBouquetToCart = (bouquet: CartBouquet) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_BOUQUET,
      payload: bouquet,
    });
  };
};

export const setBouquetQuantity = (quantity: number, id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_BOUQUET_QUANTITY,
      payload: { quantity, id },
    });
  };
};

export const removeBouquet = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.REMOVE_BOUQUET, payload: id });
  };
};
