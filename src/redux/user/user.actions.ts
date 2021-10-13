import { Authentication, User } from './user.reducer';
import { ActionType } from './action.types';

interface LogInUserActionSuccessful {
  type: ActionType.LOGIN_SUCCESSFUL;
  payload: User;
}

interface LogInUserError {
  type: ActionType.LOGIN_ERROR;
  payload: string;
}

interface LogOutUserAction {
  type: ActionType.LOGOUT;
}

export type Action =
  | LogInUserActionSuccessful
  | LogOutUserAction
  | LogInUserError;
