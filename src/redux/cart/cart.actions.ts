import { CartBouquet, CartProduct } from '../../common/types';
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

interface AddItem {
  type: ActionType.ADD_ITEM;
  payload: CartProduct;
}

interface ArbitraryValue {
  type: ActionType.SET_ARBITRARY_VALUE;
  payload: { id: string; value: number };
}

interface AddBouquet {
  type: ActionType.ADD_BOUQUET;
  payload: CartBouquet;
}

interface SetBouquetQuantity {
  type: ActionType.SET_BOUQUET_QUANTITY;
  payload: { id: string; quantity: number };
}

interface RemoveBouquet {
  type: ActionType.REMOVE_BOUQUET;
  payload: string;
}

export type Action =
  | RemoveItem
  | IncreaseQuanitity
  | DecreaseQuanitity
  | ClearCart
  | AddItem
  | ArbitraryValue
  | AddBouquet
  | SetBouquetQuantity
  | RemoveBouquet;
