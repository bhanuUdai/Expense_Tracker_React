import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    // fontSize: 15, // Base font size (since 1rem = 10px now)
    // h1: {
    //   fontSize: '3.2rem', // 32px
    // },
    // body1: {
    //   fontSize: '1.4rem', // 14px
    // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase transformation globally
        },
      },
    },
  },
});
export default theme
