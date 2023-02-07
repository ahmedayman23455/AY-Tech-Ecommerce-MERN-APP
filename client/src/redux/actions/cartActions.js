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
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured, Please try again later',
      ),
    );
  }
};

/* ------------------- removeCartItem ------------------- */
export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemoval(id));
};
