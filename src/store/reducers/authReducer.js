/* eslint-disable default-param-last */
import { LOGIN_FAILURE, LOGIN_SUCCESSFUL, LOGOUT } from '../types/authTypes';
import getCurrentLocalStorage from '../utils/LocalStorageUtils';

const initialState = {
  token: getCurrentLocalStorage('token'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        token: null,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authReducer;
