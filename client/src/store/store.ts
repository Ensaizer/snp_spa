
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authReducer';
import productSlice from './slice/products';

export const store = configureStore({
    reducer: {
        auth: authReducer,
      productsState: productSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
