import { ActionType } from './action.types';
import { Action } from './user.actions';

export type User = {
  email: string;
  password: string;
  name?: string;
  surname?: string;
  street?: string;
  city?: string;
  zipCode?: string;
} | null;

const reducer = (state: User = null, action: Action) => {
  if (action.type === ActionType.LOGIN) {
    return action.payload;
  }
  if (action.type === ActionType.LOGOUT) {
    return null;
  }
  return state;
};

export default reducer;
