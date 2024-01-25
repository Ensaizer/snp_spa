import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import productSlice from './Productslice/products';
import {categoryApi} from "./categorySlise/category.ts";
import {usersApi} from "./userSlice/userSlice.ts";
import {cartApi} from "./cartSlice/cartSlice.ts";
import {orderApi} from "./orderSlice/orderSlice.ts";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    productsState: productSlice,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(categoryApi.middleware, usersApi.middleware, cartApi.middleware, orderApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
