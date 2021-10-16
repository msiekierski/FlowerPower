import { CartProduct } from '../../common/types';
import { ActionType } from './action.types';
import { Action } from './cart.actions';

export type Cart = {
  items: Array<CartProduct>;
};

const initialState: Cart = {
  items: [
    {
      productId: '000001',
      productImageUrl:
        'https://www.trigartflowernursery.com/wp-content/uploads/2020/12/red-rose.jpg',
      itemDescription: 'Red rose (#000001)',
      storeName: `Nowak's Flower Shop`,
      itemPrice: 5.99,
      quantity: 4,
    },
    {
      productId: '0000002',
      productImageUrl:
        'https://www.trigartflowernursery.com/wp-content/uploads/2020/12/red-rose.jpg',
      itemDescription: 'Red rose (#000001)',
      storeName: `Nowak's Flower Shop`,
      itemPrice: 5.99,
      quantity: 4,
    },
  ],
};

const reducer = (state: Cart = initialState, action: Action): Cart => {
  if (action.type === ActionType.REMOVE_ITEM) {
    return {
      ...state,
      items: state.items.filter((item) => item.productId !== action.payload),
    };
  }
  if (action.type === ActionType.INCREASE_QUANTITY) {
    const tempItems = state.items.map((item) => {
      if (item.productId === action.payload) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    return { ...state, items: tempItems };
  }
  if (action.type === ActionType.DECREASE_QUANTITY) {
    const item = state.items.find((item) => item.productId === action.payload);
    if (item?.quantity === 1) {
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
      };
    }
    return {
      ...state,
      items: state.items.map((item) => {
        if (item.productId === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    };
  }
  if (action.type === ActionType.CLEAR_CART) {
    return { ...state, items: [] };
  }
  return state;
};

export default reducer;
