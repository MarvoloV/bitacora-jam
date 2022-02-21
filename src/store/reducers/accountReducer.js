/* eslint-disable default-param-last */
/* eslint-disable no-underscore-dangle */

import {
  CREATE_ACCOUNT,
  LOAD_ACCOUNTS,
  GET_ID_ACCOUNT,
  UPDATE_ACCOUNT,
  PATCH_ACCOUNT,
  SHOW_LOADER,
  HIDE_LOADER,
  DELETE_ACCOUNT,
} from '../types/accountTypes';

const initialState = {
  accounts: { account: [], loaded: false },
  operations: { operation: [] },
  // products: { items: [], loaded: false },
  // idProduct: '',
  // idMarket: '',
  // marketProducts: [],
  // isLoading: false,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ACCOUNTS:
      return {
        ...state,
        operations: {
          operation: action.payload,
        },
      };
    case CREATE_ACCOUNT:
      return {
        ...state,
        accounts: {
          account: [...state.accounts.account, action.payload],
          loaded: true,
        },
      };
    case UPDATE_ACCOUNT: {
      const newData = state.accounts.account.map((el) => {
        if (el._id === action.payload._id) {
          return action.payload;
        }
        return el;
      });

      return {
        ...state,
        accounts: {
          account: newData,
          loaded: true,
        },
      };
    }
    case GET_ID_ACCOUNT:
      return { ...state, idProduct: action.payload };
    case SHOW_LOADER:
    case HIDE_LOADER:
      return { ...state, isLoading: action.payload };
    case PATCH_ACCOUNT:
      return { ...state, product: action.payload };
    case DELETE_ACCOUNT: {
      const newData = state.accounts.account.filter(
        (el) => el._id !== action.payload._id,
      );
      return {
        ...state,
        accounts: {
          account: newData,
          loaded: true,
        },
      };
    }
    default:
      return state;
  }
};

export default accountReducer;
