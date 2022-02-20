import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_URL_BASE || 'http://localhost:8080';

const postLogin = async (email, password) => {
  const data = {
    email,
    password,
  };
  const url = `${URL_BASE}/auth/local/login`;

  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
  try {
    const res = await axios(config);
    return res;
  } catch (error) {
    return error;
  }
};
export default postLogin;
