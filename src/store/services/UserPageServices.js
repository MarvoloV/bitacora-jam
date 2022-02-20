import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_URL_BASE || 'http://localhost:8080';

export const postChangeAddress = async (form, id, token) => {
  const reponseData = await axios.patch(`${URL_BASE}/api/user/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return reponseData;
};

export const patchUser = async (data, id, token) => {
  try {
    const reponseData = await axios.patch(`${URL_BASE}/api/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return reponseData;
  } catch (error) {
    return error;
  }
};
export const patchUserAccounts = async (accountArray, id) => {
  const accountUpdate = { accountId: accountArray };
  const token = JSON.parse(localStorage.getItem('token'));
  const responseUser = await axios.patch(
    `${URL_BASE}/api/user/${id}`,
    accountUpdate,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return responseUser.data;
};
export const uploadSingleFile = async (data, token) => {
  try {
    const reponseData = await axios.post(`${URL_BASE}/api/upload/file`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return reponseData;
  } catch (error) {
    return error;
  }
};
export const getUser = async (token, idUser) => {
  const url = `${URL_BASE}/api/user/${idUser}`;
  const config = {
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await axios(config);
  return response;
};
