import axios from 'axios';
import {
  setLoading,
  cartItemAdd,
  setError,
  cartItemRemoval,
} from '../slices/cart';

/* --------------------- addCartItem -------------------- */
export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    const itemToAdd = {
      id: data.data._id,
      name: data.data.name,
      image: data.data.image,
      price: data.data.price,
      stock: data.data.stock,
      qty,
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
