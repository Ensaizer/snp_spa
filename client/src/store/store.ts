import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authReducer';
import productSlice from './slice/products';
import {categoryApi} from "./categorySlise/category.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productsState: productSlice,

  },

    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(categoryApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
