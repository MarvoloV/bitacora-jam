import {
  LOAD_USER,
  UPDATE_USER_SUCESSFUL,
  UPDATE_USER_FAILURE,
  UPLOAD_USER_PICTURE,
} from '../types/userTypes';
import {
  patchUser,
  uploadSingleFile,
  getUser,
} from '../services/UserPageServices';

export const loadUser = (user) => ({
  type: LOAD_USER,
  payload: user.data,
});

export const updateUserSucess = (user) => ({
  type: UPDATE_USER_SUCESSFUL,
  payload: user.data,
});

export const updateUserFailure = () => ({
  type: UPDATE_USER_FAILURE,
  payload: null,
});

export const updateUserProfile = (picture) => ({
  type: UPLOAD_USER_PICTURE,
  payload: picture,
});
// FUNCIONES ASINCRONICAS
export const fetchUser = (token, idUser) => async (dispatch) => {
  const user = await getUser(token, idUser);
  dispatch(loadUser(user));
};
export const fetchUpdateUser = (data, id, token) => async (dispatch) => {
  const user = await patchUser(data, id, token);
  if (user.statusText === 'OK') {
    dispatch(updateUserSucess(user));
    return 'OK';
  }
  dispatch(updateUserFailure());
  return 'error';
  //
};

export const fetchUpdateAvatarUser = (data, id, token) => async (dispatch) => {
  const upload = await uploadSingleFile(data, token);
  if (upload.statusText === 'Created' || upload.status === 201) {
    const { url: picture } = upload.data;
    // dispatch(updateUserProfile(picture));
    dispatch(fetchUpdateUser({ picture }, id, token));
  } else {
    dispatch(updateUserFailure());
  }

  return null;
};
