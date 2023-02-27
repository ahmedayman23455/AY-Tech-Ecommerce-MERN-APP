import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? null,
  userToken: JSON.parse(localStorage.getItem('userToken')) ?? null,
  updateSuccess: false,
  orders: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload.data.user;
      state.userToken = payload.token;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    updateUserProfile: (state, { payload }) => {
      state.userInfo = payload.data.user;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    setUserOrders: (state, { payload }) => {
      state.error = null;
      state.orders = payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  userLogin,
  userLogout,
  setError,
  updateUserProfile,
  resetUpdate,
  setUserOrders,
} = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;
