import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authReducer';
import productSlice from './slice/products';
import cartReducer from './slices/cartSlice/cartReducer';
import {categoryApi} from "./categorySlise/category.ts";
import {usersApi} from "./userSlice/userSlice.ts";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    productsState: productSlice,
    [categoryApi.reducerPath]: categoryApi.reducer,
    cart: cartReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(categoryApi.middleware, usersApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
