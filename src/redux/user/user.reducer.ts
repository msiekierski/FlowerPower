import { CreditCard, Location, Roles } from '../../common/types';
import { ActionType } from './action.types';
import { Action } from './user.actions';

export type User = {
  id?: string;
  email: string;
  password: string;
  name?: string;
  surname?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  role?: string;
  phone?: string;
  creditCard?: CreditCard | null;
} | null;

export type Authentication = {
  isLoading: boolean;
  error: string;
  user: User;
  location: Location;
};

const initialState: Authentication = {
  isLoading: false,
  error: '',
  user: null,
  location: {
    lat: 0,
    long: 0,
    city: 'Wrocław',
    formattedAddress: '',
  },
};

const reducer = (
  state: Authentication = initialState,
  action: Action
): Authentication => {
  if (action.type === ActionType.LOGIN_SUCCESSFUL) {
    return { ...state, user: action.payload };
  }
  if (action.type === ActionType.LOGOUT) {
    return { ...state, isLoading: false, error: '', user: null };
  }
  if (action.type === ActionType.LOGIN_ERROR) {
    return { ...state, error: action.payload, isLoading: false };
  }
  if (action.type === ActionType.CLEAR_LOGIN_DATA) {
    return { ...state, error: '', isLoading: false };
  }
  if (action.type === ActionType.START_FETCHING) {
    return { ...state, isLoading: true };
  }
  if (action.type === ActionType.SET_LOCATION) {
    return { ...state, location: action.payload };
  }
  if (action.type === ActionType.SET_DETAILS) {
    return {
      ...state,
      user: {
        ...state.user!,
        city: action.payload.city,
        zipCode: action.payload.zipCode,
        phone: action.payload.phoneNumber,
        name: action.payload.name,
        surname: action.payload.surname,
        street: action.payload.street,
      },
    };
  }
  return state;
};

export default reducer;
