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
import {
  resetError as resetErrorOfProducts,
  setProducts,
  setProductUpdateFlag,
} from '../slices/products.js';
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

/* -------------------- updateProduct ------------------- */
export const updateProduct =
  (productId, updatedProduct) => async (dispatch, getState) => {
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
        `/api/v1/products/${productId}`,
        updatedProduct,
        config,
      );

      const { data: response } = await axios.get(
        '/api/v1/products',
        config,
      );

      console.log(response);

      dispatch(setProducts(response.data));
      dispatch(setProductUpdateFlag());
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };

/* --------------------- deleteProduct --------------------- */
export const deleteProduct =
  (productId) => async (dispatch, getState) => {
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

      await axios.delete(`/api/v1/products/${productId}`, config);

      const { data: response } = await axios.get(
        '/api/v1/products',
        config,
      );

      dispatch(setProducts(response.data));
      dispatch(setProductUpdateFlag());
      dispatch(resetError());
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };

/* -------------------- createProduct ------------------- */
export const createProduct =
  (createdProduct) => async (dispatch, getState) => {
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

      await axios.post(`/api/v1/products`, createdProduct, config);

      const { data: response } = await axios.get(
        '/api/v1/products',
        config,
      );

      dispatch(setProducts(response.data));
      dispatch(setProductUpdateFlag());
      dispatch(resetError());
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };

/* --------------------- resetError --------------------- */
export const resetErrorAndRemovel = () => async (dispatch) => {
  dispatch(resetError());
};
