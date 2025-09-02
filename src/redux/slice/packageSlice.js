import { createSlice } from "@reduxjs/toolkit";
export const packageSlice = createSlice({
  name: "packageSlice",
  initialState: {
    monthly: [],
    yearly: [],
    lifTime: [],
    monthlyAdmin: [],
    yearlyAdmin: [],
    lifTimeAdmin: [],
    OrderPackage: {},
    editPackageData: {},
    Total: 0,
  },
  reducers: {
    setMonthlyPackageList: (state, action) => {
      state.monthly = action.payload;
    },
    setYearlyPackageList: (state, action) => {
      state.yearly = action.payload;
    },
    setLifTimePackageList: (state, action) => {
      state.lifTime = action.payload;
    },
    setMonthlyPackageListAdmin: (state, action) => {
      state.monthlyAdmin = action.payload;
    },
    setYearlyPackageListAdmin: (state, action) => {
      state.yearlyAdmin = action.payload;
    },
    setLifTimePackageListAdmin: (state, action) => {
      state.lifTimeAdmin = action.payload;
    },
    setEditPackageData: (state, action) => {
      state.editPackageData = action.payload;
    },
    setOrderPackage: (state, action) => {
      state.OrderPackage = action.payload;
    },
    setTotalPackage: (state, action) => {
      state.Total = action.payload;
    },
  },
});
export const {
  setMonthlyPackageList,
  setYearlyPackageList,
  setLifTimePackageList,
  setOrderPackage,
  setTotalPackage,
  setMonthlyPackageListAdmin,
  setYearlyPackageListAdmin,
  setLifTimePackageListAdmin,
  setEditPackageData,
} = packageSlice.actions;
export default packageSlice.reducer;
