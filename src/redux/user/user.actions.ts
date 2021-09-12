import { User } from './user.reducer';
import { ActionType } from './action.types';

interface LogInUserAction {
  type: ActionType.LOGIN;
  payload: User;
}

interface LogOutUserAction {
  type: ActionType.LOGOUT;
}

export type Action = LogInUserAction | LogOutUserAction;
