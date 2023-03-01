import axios from 'axios';
import {
  setLoading,
  setError,
  setProducts,
  setProduct,
  productReviewed,
  resetError,
  setProductUpdateFlag,
  setReviewRemovalFlag,
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

/* ----------------- createProductReview ---------------- */
export const createProductReview =
  (productId, review, rating) => async (dispatch, getState) => {
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

      await axios.post(
        `/api/v1/products/${productId}/reviews`,
        { review, rating },
        config,
      );

      dispatch(productReviewed());
    } catch (error) {
      setErrorFun(dispatch, error, setError);
    }
  };

/* ------------------ resetProductError ----------------- */
export const resetProductError = () => async (dispatch) => {
  dispatch(resetError());
};
