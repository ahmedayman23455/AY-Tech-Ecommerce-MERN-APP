import axios from 'axios';
import {
  setLoading,
  userLogin,
  userLogout,
  setError,
  updateUserProfile,
  resetUpdate,
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

    const { data: response } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config,
    );

    dispatch(userLogin(response));
    localStorage.setItem(
      'userInfo',
      JSON.stringify(response.data.user),
    );
    localStorage.setItem('userToken', JSON.stringify(response.token));
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* ----------------------- logout ----------------------- */
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');

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

      const { data: response } = await axios.post(
        '/api/v1/users/signup',
        { name, email, password, passwordConfirm },
        config,
      );

      dispatch(userLogin(response));

      localStorage.setItem(
        'userInfo',
        JSON.stringify(response.data.user),
      );

      localStorage.setItem(
        'userToken',
        JSON.stringify(response.token),
      );
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };

/* -------------------- updateProfile ------------------- */
export const updateProfile =
  (name, email) => async (dispatch, getState) => {
    const {
      user: { userToken },
    } = getState();

    dispatch(setLoading(true));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      };

      const { data: response } = await axios.patch(
        'api/v1/users/updateMe',
        { name, email },
        config,
      );

      localStorage.setItem(
        'userInfo',
        JSON.stringify(response.data.user),
      );

      dispatch(updateUserProfile(response));
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };

/* ----------------- resetUpdateSuccess ----------------- */
// Flag tells us every time the update is successfull
export const resetUpdateSuccess = () => (dispatch) => {
  dispatch(resetUpdate());
};
