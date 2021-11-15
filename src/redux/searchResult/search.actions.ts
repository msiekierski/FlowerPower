import { PageResult } from '../../pages/SearchResultPage/SearchResultPage';
import { ActionType } from './action.types';

interface BeginFetch {
  type: ActionType.FETCH_BEGIN;
}

interface FetchSuccess {
  type: ActionType.FETCH_SUCCESS;
  payload: PageResult;
}

interface FetchError {
  type: ActionType.FETCH_ERORR;
}

interface ChangeCategoryValue {
  type: ActionType.CHANGE_CATEGORY_FILTER_VALUE;
  payload: { category: string; subcategory: string; newValue: boolean };
}

export type Action =
  | BeginFetch
  | FetchSuccess
  | FetchError
  | ChangeCategoryValue;
