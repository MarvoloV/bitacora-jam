import { LOGIN_SUCCESSFUL, LOGIN_FAILURE, LOGOUT } from '../types/authTypes';
import postLogin from '../services/LoginPageServices';

export const loginUserSucess = (token) => ({
  type: LOGIN_SUCCESSFUL,
  payload: token,
});

export const loginUserFailure = () => ({
  type: LOGIN_FAILURE,
  payload: null,
});

export const logoutUser = () => ({
  type: LOGOUT,
  payload: null,
});

export const fetchLogin = (email, password) => async (dispatch) => {
  const res = await postLogin(email, password);
  if (res.statusText === 'OK') {
    const { JWT: token } = res.data;
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(loginUserSucess(token));
    return token;
  }
  dispatch(loginUserFailure());
  return null;
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(logoutUser());
};
