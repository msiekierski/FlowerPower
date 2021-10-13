import { ActionType } from './action.types';
import { User } from './user.reducer';
import { Dispatch } from 'redux';
import { Action } from './user.actions';

export const logInUser = (user: User) => {
  return async (dispatch: Dispatch<Action>) => {
    function onSuccess(userData: User) {
      dispatch({ type: ActionType.LOGIN_SUCCESSFUL, payload: user });
      return userData;
    }
    function onError(errorMessage: string) {
      dispatch({ type: ActionType.LOGIN_ERROR, payload: errorMessage });
      return errorMessage;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (user?.password !== 'user') {
        throw new Error('Incorrect email or password');
      }
      return onSuccess(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return onError(error.message);
      }
    }
  };
};

export const logOutUser = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};

export const clearLoginData = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CLEAR_LOGIN_DATA });
  };
};
