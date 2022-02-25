/* eslint-disable default-param-last */
/* eslint-disable no-underscore-dangle */

import {
  CREATE_OPERATION,
  LOAD_OPERATIONS,
  GET_ID_OPERATION,
  UPDATE_OPERATION,
  PATCH_OPERATION,
  SHOW_LOADER,
  HIDE_LOADER,
  DELETE_OPERATION,
  LOAD_OPERATION_DATE,
  CLEAN_OPERATION_DATE,
} from '../types/operationTypes';

const initialState = {
  operations: { operation: [], loaded: false },
  operationId: [],
  operationMonth: [],
};

const operationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_OPERATIONS:
      return {
        ...state,
        operations: { operation: action.payload, loaded: true },
      };
    case CREATE_OPERATION:
      return {
        ...state,
        operations: {
          operation: action.payload,
          loaded: true,
        },
      };
    case UPDATE_OPERATION: {
      /* const newData = state.operations.operation.map((el) => {
        if (el._id === action.payload._id) {
          return action.payload;
        }
        return el;
      }); */

      return {
        ...state,
        operations: {
          operation: action.payload,
          loaded: true,
        },
      };
    }
    case GET_ID_OPERATION:
      return { ...state, operationId: action.payload };
    case SHOW_LOADER:
    case HIDE_LOADER:
      return { ...state, isLoading: action.payload };
    case PATCH_OPERATION:
      return { ...state, product: action.payload };
    case DELETE_OPERATION: {
      const newData = state.operations.operation.filter(
        (el) => el._id !== action.payload._id,
      );
      return {
        ...state,
        operations: {
          operation: newData,
          loaded: true,
        },
      };
    }
    case LOAD_OPERATION_DATE:
      return {
        ...state,
        operations: { ...state.operation, loaded: true },
        // operationDate: [...state.operationDate, action.payload],
        operationMonth: [...state.operationMonth, action.payload],
      };
    case CLEAN_OPERATION_DATE:
      return {
        ...state,
        operationMonth: action.payload,
      };
    default:
      return state;
  }
};

export default operationReducer;
