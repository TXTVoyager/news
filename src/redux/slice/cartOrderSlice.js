import { createSlice } from "@reduxjs/toolkit";
export const cartOrderSlice = createSlice({
  name: "myCart",
  initialState: {
    cartUser: {},
    cartOrder: {},
    cartTotalBeforeDiscount: 0,
    cartTotalDiscount: 0,
    cartNetTotal: 0,
    cartPurchaseInitiated: {},
    cartPlatformPricing:{},
  },
  reducers: {
    setCartUser: (state, action) => {
      state.cartUser = action.payload;
    },
    setCartOrder: (state, action) => {
      state.cartOrder = action.payload;
    },
    setCartTotalBeforeDiscount: (state, action) => {
      state.cartTotalBeforeDiscount = action.payload;
    },
    setCartTotalDiscount: (state, action) => {
      state.cartTotalDiscount = action.payload;
    },
    setCartNetTotal: (state, action) => {
      state.cartNetTotal = action.payload;
    },
    setCartPurchaseInitiated: (state, action) => {
      state.cartPurchaseInitiated = action.payload;
    },
    setCartPlatformPricing: (state, action) => {
      state.cartPlatformPricing = action.payload;
    },

  },
});

export const {
  setCartUser,
  setCartOrder,
  setCartTotalBeforeDiscount,
  setCartTotalDiscount,
  setCartNetTotal,
  setCartPurchaseInitiated,
  setCartPlatformPricing,
} = cartOrderSlice.actions;
export default cartOrderSlice.reducer;
