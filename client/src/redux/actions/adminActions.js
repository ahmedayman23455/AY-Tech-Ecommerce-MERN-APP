import axios from 'axios';
import {
  setLoading,
  setError,
  getUsers,
  userDelete,
  resetError,
  getOrders,
  orderDelete,
  setDeliveredFlag,
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

    await axios.delete(`/api/v1/users/${userId}`, config);

    dispatch(userDelete());
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* --------------------- resetError --------------------- */
export const resetErrorAndRemovel = () => async (dispatch) => {
  dispatch(resetError());
};

/* -------------------- getAllOrders -------------------- */
export const getAllOrders = () => async (dispatch, getState) => {
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

    const { data: response } = await axios.get(
      '/api/v1/orders',
      config,
    );

    dispatch(getOrders(response.data));
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* --------------------- deletOrder --------------------- */
export const deleteOrder =
  (orderId) => async (dispatch, getState) => {
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
      await axios.delete(`/api/v1/orders/${orderId}`, config);
      dispatch(orderDelete());
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };

/* -------------------- setDelivered -------------------- */

export const setDelivered =
  (orderId, isDelivered) => async (dispatch, getState) => {
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

      await axios.patch(
        `/api/v1/orders/${orderId}`,
        {
          isDelivered: isDelivered,
        },
        config,
      );

      dispatch(setDeliveredFlag());
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };
