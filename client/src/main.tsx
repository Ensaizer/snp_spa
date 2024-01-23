import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import ProductPage from './components/pages/ProductPage';
import RegistrationPage from './components/pages/RegistrationPage';
import EditProductPage from './components/pages/EditProductPage';
import AdminPage from './components/pages/AdminPage';
import CartPage from './components/pages/CartPage';
import ProfilePage from './components/pages/ProfilePage';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'registration',
        element: <RegistrationPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />,
      },
      {
        path: 'products/:id/edit',
        element: <EditProductPage />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
      //   {
      //     path: '/login',
      //     element: <Login />,
      //   },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
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
