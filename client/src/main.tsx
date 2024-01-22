import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // children: [
    //   {
    //     path: '/registration',
    //     element: <Registration />,
    //   },
    //   {
    //     path: '/login',
    //     element: <Login />,
    //   },
    //   {
    //     path: '/profile',
    //     element: <Profile />,
    //   },
    //   {
    //     path: '/cart',
    //     element: <Cart />,
    //   },
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
