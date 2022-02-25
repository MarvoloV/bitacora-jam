/* eslint-disable prettier/prettier */
import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_URL_BASE || 'http://localhost:8080';

export const getOperations = async () => {
  const response = await axios.get(`${URL_BASE}/api/operation`);
  return response.data;
};
export const patchOperation = async (newOperation, id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const responseProduct = await axios.patch(
    `${URL_BASE}/api/operation/${id}`,
    newOperation,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return responseProduct.data;
};
export const getOperation = async (id) => {
  const response = await axios.get(`${URL_BASE}/api/operation/${id}`);
  return response.data;
};
export const postOperation = async (formOperation) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const responseOperation = await axios.post(
    `${URL_BASE}/api/operation`,
    formOperation,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return responseOperation.data;
};
export const deletedOperation = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const responseOperation = await axios.delete(
    `${URL_BASE}/api/operation/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return responseOperation.data;
};
export const postOperationDate = async (id, startDate, endDate) => {
  const formOperation = { id, startDate, endDate };
  const token = JSON.parse(localStorage.getItem('token'));
  const responseOperation = await axios.post(
    `${URL_BASE}/api/operation/date`,
    formOperation,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return responseOperation.data;
};
