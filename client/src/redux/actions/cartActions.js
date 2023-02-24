import axios from 'axios';
import {
  setLoading,
  cartItemAdd,
  setError,
  cartItemRemoval,
  setExpressShipping,
  clearCart,
} from '../slices/cart';
import { setErrorFun } from '../utils/setErrorFun';

/* --------------------- addCartItem -------------------- */
export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data: response } = await axios.get(
      `/api/v1/products/${id}`,
    );

    const itemToAdd = {
      id: response.data._id,
      name: response.data.name,
      image: response.data.image,
      price: response.data.price,
      stock: response.data.stock,
      qty: Number(qty),
    };
    dispatch(cartItemAdd(itemToAdd));
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* ------------------- removeCartItem ------------------- */
export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    dispatch(cartItemRemoval(id));
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* --------------------- setExpress --------------------- */
export const setExpress = (value) => (dispatch) => {   

  try {
    dispatch(setExpressShipping(value));
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};

/* ---------------------- resetCart --------------------- */

export const resetCart = () => async (dispatch) => {
  try {
    dispatch(clearCart());
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};
