import { ApiCallState, FlowerShop } from '../../common/types';
import { ActionType } from './action.types';
import { Action } from './shop.actions';

export type ShopState = {
  fetchStatus: ApiCallState;
  shop: {
    data: FlowerShop;
    pagination: number;
  };
  activeCategory: string;
};

const initData: ShopState = {
  shop: {
    data: {
      name: '',
      street: '',
      city: '',
      hasDelivery: false,
      phone: '',
      reviews: [],
      products: [],
      openingHours: [],
      images: [],
    },
    pagination: 1,
  },
  fetchStatus: ApiCallState.IDLE,
  activeCategory: '',
};

const reducer = (state: ShopState = initData, action: Action): ShopState => {
  if (action.type === ActionType.BEGIN_FETCH) {
    return { ...state, fetchStatus: ApiCallState.FETCH_BEGIN };
  }
  if (action.type === ActionType.FETCH_SUCCESS) {
    return {
      ...state,
      fetchStatus: ApiCallState.FETCH_SUCCESS,
      shop: { ...state.shop, data: action.payload },
    };
  }
  if (action.type === ActionType.FETCH_ERROR) {
    return {
      ...state,
      fetchStatus: ApiCallState.FETCH_ERROR,
    };
  }
  if (action.type === ActionType.SET_ACTIVE_CATEGORY) {
    return {
      ...state,
      activeCategory: action.payload,
      shop: { ...state.shop, pagination: 1 },
    };
  }
  if (action.type === ActionType.SET_PAGINATION) {
    return { ...state, shop: { ...state.shop, pagination: action.payload } };
  }
  return state;
};

export default reducer;
