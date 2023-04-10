import { createTheme } from '@mui/material/styles';


export const Styles = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2759cd',
    },
    secondary: {
      main: '#304166',
    },
    error: {
      main: '#ee4932',
    },
  },
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
  }
});
