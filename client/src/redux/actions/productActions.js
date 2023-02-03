import axios from 'axios';
import {
  setProducts,
  setLoading,
  setError,
} from '../slices/productsSlice';
/* ------------------------------------------------------ */

/* --------------------- getProducts -------------------- */
export const getProducts = () =>
  async function (dispatch) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios('/api/v1/products');
      dispatch(setProducts(data.data));
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
