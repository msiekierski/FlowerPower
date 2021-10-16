import { ActionType } from './action.types';

interface RemoveItem {
  type: ActionType.REMOVE_ITEM;
  payload: string;
}

interface IncreaseQuanitity {
  type: ActionType.INCREASE_QUANTITY;
  payload: string;
}

interface DecreaseQuanitity {
  type: ActionType.DECREASE_QUANTITY;
  payload: string;
}

interface ClearCart {
  type: ActionType.CLEAR_CART;
}

export type Action =
  | RemoveItem
  | IncreaseQuanitity
  | DecreaseQuanitity
  | ClearCart;
