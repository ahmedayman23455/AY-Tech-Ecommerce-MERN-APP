import axios from 'axios';
import {
  setError,
  shippingAddressAdd,
  clearOrder,
} from '../slices/order';
/* ------------------------------------------------------ */

/* ----------------- setShippingAddress ----------------- */
export const setShippingAddress = (data) => (dispatch) => {
  dispatch(shippingAddressAdd(data));
};

/* --------------- setShippingAddressError -------------- */
export const setShippingAddressError = (value) => (dispatch) => {
  dispatch(setError(value));
};

/* --------------------- createOrder -------------------- */
export const createOrder = (order) => async (dispatch, getState) => {
  const {
    order: { shippingAddress },
    user: { userInfo, userToken },
  } = getState();

  const preparedOrder = { ...order, shippingAddress };

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/v1/orders',
      preparedOrder,
      config,
    );
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.',
      ),
    );
  }
};

/* --------------------- resetOrder --------------------- */
export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder());
};
