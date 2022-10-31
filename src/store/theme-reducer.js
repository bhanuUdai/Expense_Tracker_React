import { createSlice } from "@reduxjs/toolkit";

const initialThemeState={theme:false}

const themeSlice= createSlice({
    name:'theme',
    initialState:initialThemeState,
    reducers:{
        toggleTheme(state)
        {
            state.theme=!state.theme
        }
    }
})

export const themeAction=themeSlice.actions;
export default themeSlice.reducer;