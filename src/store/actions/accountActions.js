/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import {
  CREATE_ACCOUNT,
  LOAD_ACCOUNTS,
  GET_ID_ACCOUNT,
  UPDATE_ACCOUNT,
  /*   PATCH_ACCOUNT, */
  SHOW_LOADER,
  HIDE_LOADER,
  DELETE_ACCOUNT,
} from '../types/accountTypes';
import {
  getAccounts,
  postAccount,
  patchAccount,
  deletedAccount,
} from '../services/accountServices';
import { patchUserAccounts } from '../services/UserPageServices';
// import { fetchUpdateUser } from './userActionsCreator';

export const showLoader = () => ({
  type: SHOW_LOADER,
  payload: true,
});

export const hideLoader = () => ({
  type: HIDE_LOADER,
  payload: false,
});

export const loadAccounts = (accounts) => ({
  type: LOAD_ACCOUNTS,
  payload: accounts.data,
});

export const createAccount = (account) => ({
  type: CREATE_ACCOUNT,
  payload: account,
});

export const updateAccount = (account) => ({
  type: UPDATE_ACCOUNT,
  payload: account,
});
export const deleteAccount = (account) => ({
  type: DELETE_ACCOUNT,
  payload: account,
});

export const fetchIdAccount = (id) => async (dispatch) => {
  dispatch({
    type: GET_ID_ACCOUNT,
    payload: id,
  });
};

export const fetchUpdateAccount = (newAccount, id) => async (dispatch) => {
  const responseAccount = await patchAccount(newAccount, id);
  dispatch(updateAccount(responseAccount));
};
export const fetchAccounts = () => async (dispatch) => {
  const accounts = await getAccounts();
  dispatch(loadAccounts(accounts));
};

/* export const fetchProduct = (id) => () => getProduct(id); */
export const fetchDeleteAccount = (id) => async (dispatch) => {
  const accounts = await deletedAccount(id);
  dispatch(deleteAccount(accounts));
};
export const sendAccount =
  (formAccount, accountArray, id) => async (dispatch) => {
    const responseAccount = await postAccount(formAccount);
    accountArray.push(responseAccount._id);
    patchUserAccounts(accountArray, id);
    dispatch(createAccount(responseAccount));
  };
