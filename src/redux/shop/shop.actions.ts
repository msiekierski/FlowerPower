import { FlowerShop } from '../../common/types';
import { ActionType } from './action.types';

interface BeginFetch {
  type: ActionType.BEGIN_FETCH;
}

interface FetchSuccess {
  type: ActionType.FETCH_SUCCESS;
  payload: FlowerShop;
}

interface FetchError {
  type: ActionType.FETCH_ERROR;
}

interface SetActiveCategory {
  type: ActionType.SET_ACTIVE_CATEGORY;
  payload: string;
}

interface SetPagination {
  type: ActionType.SET_PAGINATION;
  payload: number;
}

interface Clear {
  type: ActionType.CLEAR;
}

export type Action =
  | BeginFetch
  | FetchSuccess
  | FetchError
  | SetActiveCategory
  | SetPagination
  | Clear;
