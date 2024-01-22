import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from './store/store.ts';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
            path: "/registration",
            element: <Registration/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            },
            {
                path: "/cart",
                element: <Cart/>,
            },
      ]
    },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
);
