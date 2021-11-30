import { ActionType } from './action.types';
import { User } from './user.reducer';
import { Dispatch } from 'redux';
import { Action } from './user.actions';
import axios from 'axios';
import { Location, UserDetails } from '../../common/types';
import { apiCreditCardToState } from '../../utils/objectMapping/apiCreditCardToState';

const loginApiUrl =
  process.env.REACT_APP_API_ADDRESS + 'flowerPower/login/check';
const getShipmentApiUrl = (userId: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/get/clientInfoForOrder/${userId}`;

const getCreditCardApiUrl = (userId: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/get/creditCard/${userId}`;

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
      dispatch({ type: ActionType.START_FETCHING });
      const { data } = await axios.post(loginApiUrl, {
        email: user?.email,
        password: user?.password,
      });
      user!.id = data.split(':')[0];
      user!.role = data.split(':')[1];
      const response = await axios.get(getShipmentApiUrl(user?.id!));

      user!.name = response.data.name;
      user!.surname = response.data.surname;
      user!.zipCode = response.data.postalCode;
      user!.street = response.data.address;
      user!.city = response.data.city;
      user!.phone = response.data.phone;

      const creditResponse = await axios.get(getCreditCardApiUrl(user?.id!));

      if (creditResponse.data.length > 0) {
        user!.creditCard = apiCreditCardToState(creditResponse.data[0]);
      }

      return onSuccess(user);
    } catch (e) {
      return onError(e.response.data);
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

export const setLocation = (location: Location) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_LOCATION, payload: location });
  };
};

export const setDetails = (details: UserDetails) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_DETAILS, payload: details });
  };
};
