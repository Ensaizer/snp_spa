import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slice/products';

export const store = configureStore({
  reducer: {
    productsState: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
