import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { theme: false, onPremium:false };

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme(state) {
      state.theme = !state.theme;
    },
    offTheme(state) {
      state.theme = false;
    },
    onTheme(state) {
      state.theme = true;
    },
    onPremium(state)
    {
        state.onPremium=true;
    },
    offPremium(state)
    {
        state.onPremium=false;
    }
  },
});

export const themeAction = themeSlice.actions;
export default themeSlice.reducer;
