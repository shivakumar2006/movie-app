import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme); // Persist theme to localStorage
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
