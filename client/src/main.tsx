import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import ProfilePage from './components/pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      //   {
      //     path: '/registration',
      //     element: <Registration />,
      //   },
      //   {
      //     path: '/login',
      //     element: <Login />,
      //   },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      //   {
      //     path: '/cart',
      //     element: <Cart />,
      //   },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
