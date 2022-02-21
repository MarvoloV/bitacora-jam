/* eslint-disable prettier/prettier */
import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_URL_BASE || 'http://localhost:8080';

/* export const getAccounts = async () => {
  const response = await axios.get(`${URL_BASE}/api/account`);
  return response;
}; */
export const getAccounts = async (id) => {
  const response = await axios.get(`${URL_BASE}/api/account/${id}`);
  return response.data.operationId;
};

export const patchAccount = async (newAccount, id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const responseProduct = await axios.patch(
    `${URL_BASE}/api/account/${id}`,
    newAccount,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return responseProduct.data;
};

export const patchAccountOperations = async (operationArray, id) => {
  const operationUpdate = { operationId: operationArray };
  const token = JSON.parse(localStorage.getItem('token'));
  const responseAccount = await axios.patch(
    `${URL_BASE}/api/account/${id}`,
    operationUpdate,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return responseAccount.data;
};
export const getAccount = async (id) => {
  const response = await axios.get(`${URL_BASE}/api/account/${id}`);
  return response.data;
};
export const postAccount = async (formAccount) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const responseProduct = await axios.post(
    `${URL_BASE}/api/account`,
    formAccount,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return responseProduct.data;
};
export const deletedAccount = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const responseAccount = await axios.delete(`${URL_BASE}/api/account/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return responseAccount.data;
};
