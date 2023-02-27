import axios from 'axios';
import {
  setLoading,
  setError,
  getUsers,
  userDelete,
  resetError,
} from '../slices/admin.js';
import { setErrorFun } from './../utils/setErrorFun';

/* --------------------- getAllUsers -------------------- */
export const getAllUsers = () => async (dispatch, getState) => {
  dispatch(setLoading(true));

  const {
    user: { userToken },
  } = getState();

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    const { data: response } = await axios.get(
      '/api/v1/users',
      config,
    );

    dispatch(getUsers(response.data));
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* --------------------- deleteUser --------------------- */
export const deleteUser = (userId) => async (dispatch, getState) => {
  const {
    user: { userToken },
  } = getState();

  dispatch(setLoading(true));

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    const { data: response } = await axios.delete(
      `/api/v1/users/${userId}`,
      config,
    );

    dispatch(userDelete());
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* --------------------- resetError --------------------- */
export const resetErrorAndRemovel = () => async (dispatch) => {
  dispatch(resetError());
};
