import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  userList: null,
  userRemovel: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
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

    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemovel = false;
    },
  },
});

export const {
  setLoading,
  setError,
  getUsers,
  userDelete,
  resetError,
} = adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
