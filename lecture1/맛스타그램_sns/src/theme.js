import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35', // 오렌지색
      light: '#FF8A5B',
      dark: '#E85A2B',
    },
    secondary: {
      main: '#FFB996', // 연한 오렌지색
      light: '#FFCDB2',
      dark: '#FFA07A',
    },
    background: {
      default: '#FFFAF7',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans KR", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
  },
  spacing: 8,
});

export default theme;
