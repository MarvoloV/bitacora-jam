/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import {
  CREATE_OPERATION,
  LOAD_OPERATIONS,
  GET_ID_OPERATION,
  UPDATE_OPERATION,
  /*   PATCH_OPERATION, */
  SHOW_LOADER,
  HIDE_LOADER,
  DELETE_OPERATION,
} from '../types/operationTypes';
import {
  getOperations,
  postOperation,
  patchOperation,
  deletedOperation,
  getOperation,
} from '../services/operationServices';
import { patchAccountOperations } from '../services/accountServices';
// import { fetchUpdateUser } from './userActionsCreator';

export const showLoader = () => ({
  type: SHOW_LOADER,
  payload: true,
});

export const hideLoader = () => ({
  type: HIDE_LOADER,
  payload: false,
});

export const loadOperations = (operations) => ({
  type: LOAD_OPERATIONS,
  payload: operations.data,
});

export const createOperation = (operation) => ({
  type: CREATE_OPERATION,
  payload: operation,
});

export const updateOperation = (operation) => ({
  type: UPDATE_OPERATION,
  payload: operation,
});
export const deleteOperation = (operation) => ({
  type: DELETE_OPERATION,
  payload: operation,
});
export const loadOperationID = (operation) => ({
  type: GET_ID_OPERATION,
  payload: operation,
});
/* export const fetchIdOperation = (id) => async (dispatch) => {
  dispatch({
    type: GET_ID_OPERATION,
    payload: id,
  });
}; */
export const fetchIdOperation = (id) => async (dispatch) => {
  const operationid = await getOperation(id);
  dispatch(loadOperationID(operationid));
};

export const fetchUpdateOperation = (newOperation, id) => async (dispatch) => {
  const responseOperation = await patchOperation(newOperation, id);
  dispatch(updateOperation(responseOperation));
};
export const fetchOperations = () => async (dispatch) => {
  const operations = await getOperations();
  dispatch(loadOperations(operations));
};

/* export const fetchProduct = (id) => () => getProduct(id); */
export const fetchDeleteOperation = (id) => async (dispatch) => {
  const operations = await deletedOperation(id);
  dispatch(deleteOperation(operations));
};
export const sendOperation =
  (formOperation, operationArray, id) => async (dispatch) => {
    const responseOperation = await postOperation(formOperation);
    operationArray.push(responseOperation._id);
    patchAccountOperations(operationArray, id);
    dispatch(createOperation(responseOperation));
  };
