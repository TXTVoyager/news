import { createSlice } from "@reduxjs/toolkit";
export const orderListSlice = createSlice({
  name: "orderSlice",
  initialState: {
    order: [],
    conform:[],
    total: 0,
    totalOrder: 0,
    clientKey:[],
 
    chartData: [],
    notifyData: 0,
    adminStripeAllData:[],
    adminStripeTotalData :0,
  },
  reducers: {
    setOrderList: (state, action) => {
      state.order = action.payload;
    },
    setTotalOrderList: (state, action) => {
      state.total = action.payload;
    },
    setConformOrder: (state, action) => {
      state.conform = action.payload;
    },
    setTotalOrderCount: (state, action) => {
      state.totalOrder = action.payload;
    },
    setOrderChardData: (state, action) => {
      state.chartData = action.payload;
    },
    setTotalNewOrderNotify: (state, action) => {
      state.notifyData = action.payload;
    },

    setAdminAllStripeData: (state, action) => {
      state.adminStripeAllData = action.payload;
    },
    setAdminAllStripeTotalData:(state, action) => {
      state.adminStripeTotalData = action.payload;
    },
    setStripeClientKey:(state, action) => {
      state.clientKey = action.payload;
    },
   
  },
});
export const {
  setOrderList,
  setTotalOrderList,
  setConformOrder,
  setTotalOrderCount,
  setOrderChardData,
  setTotalNewOrderNotify,
  setAdminAllStripeData,
  setStripeClientKey,
  setAdminAllStripeTotalData
} = orderListSlice.actions;
export default orderListSlice.reducer;
