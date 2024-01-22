import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store/store';
import AdminPage from './AdminPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/admin',
        element: <AdminPage />,
      },
      //   {
      //       path: "/login",
      //       element: <Login/>,
      //   },
      //   {
      //       path: "/profile",
      //       element: <Profile/>,
      //   },
      //   {
      //       path: "/cart",
      //       element: <Cart/>,
      //   },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
