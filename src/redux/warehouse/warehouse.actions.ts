import { WarehouseItem } from '../../common/types';
import { ActionType } from './action.types';

interface StartFetching {
  type: ActionType.FETCH_START;
}

interface FetchSuccess {
  type: ActionType.FETCH_SUCCESS;
  payload: Array<WarehouseItem>;
}

interface FetchError {
  type: ActionType.FETCH_ERROR;
}

interface ToggleSelection {
  type: ActionType.TOGGLE_SELECTION;
  payload: string;
}

interface ToggleSelectAll {
  type: ActionType.TOGGLE_SELECT_ALL;
}

interface RemoveSelected {
  type: ActionType.REMOVE_SELECTED;
}

interface RemoveById {
  type: ActionType.REMOVE_BY_ID;
  payload: string;
}

export type Action =
  | StartFetching
  | FetchSuccess
  | FetchError
  | ToggleSelection
  | ToggleSelectAll
  | RemoveSelected
  | RemoveById;
