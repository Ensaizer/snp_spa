import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import RegistrationPage from './components/pages/RegistrationPage';
import AdminPage from './components/pages/AdminPage';
import CartPage from './components/pages/CartPage';
import ProductPage from './components/pages/ProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {

        path: 'registration',
        element: <RegistrationPage/>,
      },
      {
        path: 'products/:id',
        element: <ProductPage />,

      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
      //   {
      //     path: '/login',
      //     element: <Login />,
      //   },
      //   {
      //     path: '/profile',
      //     element: <Profile />,
      //   },
      {
        path: '/cart',
        element: <CartPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
