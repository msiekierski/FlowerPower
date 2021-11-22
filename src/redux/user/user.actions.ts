import { Authentication, User } from './user.reducer';
import { ActionType } from './action.types';
import { Location } from '../../common/types';

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

interface ClearLoginData {
  type: ActionType.CLEAR_LOGIN_DATA;
}

interface StartFetching {
  type: ActionType.START_FETCHING;
}

interface SetLocation {
  type: ActionType.SET_LOCATION;
  payload: Location;
}

export type Action =
  | LogInUserActionSuccessful
  | LogOutUserAction
  | LogInUserError
  | ClearLoginData
  | StartFetching
  | SetLocation;
