import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import productSlice from './Productslice/products';
import { categoryApi } from './categorySlise/category';
import { usersApi } from './userSlice/userSlice';
import { cartApi } from './cartSlice/cartSlice';
import { orderApi } from './OrderSlice/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productsState: productSlice,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      usersApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
