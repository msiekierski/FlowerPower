import { WarehouseItem } from '../../common/types';
import { ActionType } from './action.types';
import { Action } from './warehouse.actions';

export type Warehouse = {
  items: Array<WarehouseItem>;
  isLoading: boolean;
  isError: boolean;
  selectAll: boolean;
};

const initialState: Warehouse = {
  items: [
    {
      id: '0001',
      name: 'Flower 1',
      category: 'Cat 1',
      price: 5.99,
      discount: null,
      quantity: 5,
      isSelected: false,
    },
    {
      id: '0002',
      name: 'Flower 2',
      category: 'Cat 2',
      price: 5.99,
      discount: { newPrice: 4.99, dateFrom: new Date(), dateTo: new Date() },
      quantity: 5,
      isSelected: false,
    },
  ],
  isLoading: false,
  isError: false,
  selectAll: false,
};

const reducer = (
  state: Warehouse = initialState,
  action: Action
): Warehouse => {
  if (action.type === ActionType.FETCH_START) {
    return { ...state, isLoading: true, isError: false };
  }
  if (action.type === ActionType.FETCH_SUCCESS) {
    return { ...state, isLoading: false, isError: false };
  }
  if (action.type === ActionType.FETCH_ERROR) {
    return { ...state, isLoading: false, isError: true };
  }
  if (action.type === ActionType.TOGGLE_SELECTION) {
    return {
      ...state,
      items: state.items.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isSelected: !item.isSelected };
        } else {
          return item;
        }
      }),
    };
  }
  if (action.type === ActionType.TOGGLE_SELECT_ALL) {
    return {
      ...state,
      selectAll: !state.selectAll,
      items: state.items.map((item) => ({
        ...item,
        isSelected: !state.selectAll,
      })),
    };
  }
  if (action.type === ActionType.REMOVE_BY_ID) {
    return {
      ...state,
      items: state.items.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === ActionType.REMOVE_SELECTED) {
    return { ...state, items: state.items.filter((item) => !item.isSelected) };
  }
  return state;
};

export default reducer;
