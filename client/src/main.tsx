import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
=======



import './index.css';
>>>>>>> 905b4c6857112f9dae46a28b26ed8aab1dc99d4c
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
<<<<<<< HEAD
import RegistrationPage from './components/pages/RegistrationPage';
import AdminPage from './components/pages/AdminPage';
import CartPage from './components/pages/CartPage';
=======
import ProfilePage from './components/pages/ProfilePage';
import Registration from './components/ui/Registration';
import Product from './components/Product';


>>>>>>> 905b4c6857112f9dae46a28b26ed8aab1dc99d4c

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
