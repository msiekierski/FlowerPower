import { Dispatch } from 'react';
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
