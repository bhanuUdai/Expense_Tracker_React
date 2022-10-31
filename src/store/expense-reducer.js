import { createSlice } from "@reduxjs/toolkit";

const initialExpense = { expenses: [], premium: false };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpense,
  reducers: {
    updateExpense(state, action) {
      state.expenses = action.payload;
    },
    setPremium(state) {
      state.premium = true;
    },
    unSetPremium(state) {
      state.premium = false;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
