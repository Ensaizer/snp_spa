import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Outlet, useLocation } from 'react-router-dom';
import type { AxiosError } from 'axios';
import NavBar from './components/ui/NavBar';
import './index.css';
import MainPage from './components/pages/MainPage';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { refreshThunk, userCheckThunk } from './store/slices/auth/authThunks';
import { apiProductsService } from './services/apiProduct';
import Loader from './components/ui/Loader';

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
        main: '#FB6019',
      },
      text: {
        secondary: 'rgba(85, 85, 109, 1)',
      },
    },
  });
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(userCheckThunk());
  }, [dispatch]);

  useEffect(() => {
    const requestInterceptor = apiProductsService.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err),
    );

    const responseInterceptor = apiProductsService.interceptors.response.use(
      (res) => res,
      async (err: AxiosError & { config: { sent?: boolean } }) => {
        const prevRequest = err.config;
        if (err.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await dispatch(refreshThunk());
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiProductsService(prevRequest);
        }
        return Promise.reject(err);
      },
    );

    return () => {
      apiProductsService.interceptors.request.eject(requestInterceptor);
      apiProductsService.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.accessToken]);

  return (
    <ThemeProvider theme={theme}>
      <Loader isLoading={auth.user.status === 'pending'}>
        <>
        <NavBar />
        {pathname === '/' ? <MainPage /> : <Outlet />}
        </>
      </Loader>
    </ThemeProvider>
  );
}

export default App;
