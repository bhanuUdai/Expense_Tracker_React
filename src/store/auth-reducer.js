import { createSlice } from "@reduxjs/toolkit";

const initialAuth = { token: localStorage.getItem('ExpenseToken') };

const authSlice=createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    getExpenseToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("ExpenseToken", action.payload);
    },
    removeExpenseToken(state) {
      state.token = null;
      localStorage.removeItem('ExpenseToken')
    },
  },
});


export const authAction=authSlice.actions;
export default authSlice.reducer;
