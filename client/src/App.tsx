import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/ui/NavBar';
import './index.css'
import MainPage from './components/pages/MainPage';

function App(): JSX.Element {
  const { pathname } = useLocation();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#6B59CC',
        dark: '#2F2B4A',
        light: '#F0EFFA',
      },
      secondary: {
        main: '#e6ee9c',
      },
      text: {
        secondary: 'rgba(85, 85, 109, 1)'
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      {pathname === '/' ? <MainPage /> : <Outlet />}
      </ThemeProvider>
  );
}

export default App;
