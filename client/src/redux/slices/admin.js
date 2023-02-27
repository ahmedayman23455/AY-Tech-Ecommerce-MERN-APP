import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  userList: null,
  userRemovel: false,
  orderList: null,
  userRemovel: false,
  orderRemovel: false,
  deliveredFlag: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },

    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    getUsers: (state, { payload }) => {
      state.userList = payload;
      state.error = null;
    },

    userDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemovel = true;
    },

    getOrders: (state, { payload }) => {
      state.orderList = payload;
      state.loading = false;
      state.orderRemovel = false;
    },

    orderDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.orderRemovel = true;
    },

    setDeliveredFlag: (state) => {
      state.deliveredFlag = true;
      state.loading = false;
    },

    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemovel = false;
      state.orderRemovel = false;
      state.deliveredFlag = false;
    },
  },
});

export const {
  setLoading,
  setError,
  getUsers,
  userDelete,
  resetError,
  getOrders,
  orderDelete,
  setDeliveredFlag,
} = adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
