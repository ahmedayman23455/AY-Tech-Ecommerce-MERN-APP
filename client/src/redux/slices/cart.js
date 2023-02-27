import { createSlice } from '@reduxjs/toolkit';

const calculateSubtotal = (cart) => {
  let result = 0;
  cart.forEach((cartItem) => {
    result += cartItem.price * cartItem.qty;
  });
  return Number(result).toFixed(2);
};

const updateLocalStorage = (cart) => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
  localStorage.setItem(
    'subtotal',
    JSON.stringify(calculateSubtotal(cart)),
  );
};

export const initialState = {
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem('cartItems')) ?? [],
  expressShipping:
    JSON.parse(localStorage.getItem('expressShipping')) ?? false,
  subTotal: JSON.parse(localStorage.getItem('subtotal')) ?? 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },

    cartItemAdd: (state, { payload }) => {
      const existingItem = state.cart.find(
        (item) => item.id === payload.id,
      );
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === existingItem.id ? payload : item,
        );
      } else {
        state.cart = [...state.cart, payload];
      }
      state.loading = false;
      state.error = null;
      state.subTotal = calculateSubtotal(state.cart);
      updateLocalStorage(state.cart);
    },

    cartItemRemoval: (state, { payload }) => {
      state.cart = [...state.cart].filter(
        (item) => item.id !== payload,
      );
      updateLocalStorage(state.cart);
      state.subTotal = calculateSubtotal(state.cart);
      state.loading = false;
    },

    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    setExpressShipping: (state, { payload }) => {
      state.expressShipping = payload;
      localStorage.setItem('expressShipping', payload);
    },

    clearCart: (state, { payload }) => {
      localStorage.removeItem('cartItems');
      localStorage.removeItem('subtotal');
      state.cart = [];
      state.loading = false;
      state.error = null;
      state.subTotal = 0;
    },
  },
});

export const {
  setLoading,
  cartItemAdd,
  setError,
  cartItemRemoval,
  setExpressShipping,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
