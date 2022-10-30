import { createSlice } from "@reduxjs/toolkit";

const initialExpense = { expenses: [] };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpense,
  reducers: {
    updateExpense(state, action) {
      state.expenses = action.payload;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
