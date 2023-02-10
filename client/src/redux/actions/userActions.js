import axios from 'axios';
import {
  setLoading,
  userLogin,
  userLogout,
  setError,
} from '../slices/user';
import { setErrorFun } from './../utils/setErrorFun';

/* ------------------------ login ----------------------- */
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config,
    );

    dispatch(userLogin(data.data));
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* ----------------------- logout ----------------------- */
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo');
    dispatch(userLogout());
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* ---------------------- register ---------------------- */
export const register =
  (name, email, password, passwordConfirm) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/users/signup',
        { name, email, password, passwordConfirm },
        config,
      );

      dispatch(userLogin(data.data));
      localStorage.setItem('userInfo', JSON.stringify(data.data));
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };
