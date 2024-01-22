import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';
import RegistrationPage from './components/pages/RegistrationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
