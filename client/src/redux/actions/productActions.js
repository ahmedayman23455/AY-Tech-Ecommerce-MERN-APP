import axios from 'axios';
import {
  setProducts,
  setProduct,
  setLoading,
  setError,
} from '../slices/products';

import { setErrorFun } from '../utils/setErrorFun';
/* --------------------- getProducts -------------------- */
export const getProducts = () =>
  async function (dispatch) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios('/api/v1/products');
      dispatch(setProducts(data.data));
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };

/* --------------------- getProduct --------------------- */
export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch(setProduct(data.data));
  } catch (error) {
    setErrorFun(dispatch, error, setError);
  }
};
