import axios from 'axios';
import {
  setProducts,
  setProduct,
  setLoading,
  setError,
} from '../slices/products';

/* --------------------- setErrorFun -------------------- */
const setErrorFun = (dispatch, error) => {
  dispatch(
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An unexpected error has occured, Please try again later',
    ),
  );
};
/* --------------------- getProducts -------------------- */
export const getProducts = () =>
  async function (dispatch) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios('/api/v1/products');
      dispatch(setProducts(data.data));
    } catch (error) {
      setErrorFun(dispatch, error);
    }
  };

/* --------------------- getProduct --------------------- */
export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch(setProduct(data.data));
  } catch (error) {
    setErrorFun(dispatch, error);
  }
};
