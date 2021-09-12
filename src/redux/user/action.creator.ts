import { ActionType } from './action.types';
import { User } from './user.reducer';
import { Dispatch } from 'redux';
import { Action } from './user.actions';

export const logInUser = (user: User) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN,
      payload: user,
    });
  };
};

export const logOutUser = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};
