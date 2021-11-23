import { Dispatch } from 'redux';
import { WarehouseItem } from '../../common/types';
import { ActionType } from './action.types';
import { Action } from './warehouse.actions';

export const fetchData = () => {
  return async (dispatch: Dispatch<Action>) => {
    function onSuccess() {
      dispatch({ type: ActionType.FETCH_SUCCESS, payload: [] });
    }
    function onError() {
      dispatch({ type: ActionType.FETCH_ERROR });
    }
    try {
      dispatch({ type: ActionType.FETCH_START });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } catch (e) {
      onSuccess();
    }
  };
};

export const toggleSelection = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.TOGGLE_SELECTION, payload: id });
  };
};

export const toggleSelectAll = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.TOGGLE_SELECT_ALL });
  };
};

export const removeSelected = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.REMOVE_SELECTED });
  };
};

export const removeById = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.REMOVE_BY_ID, payload: id });
  };
};
