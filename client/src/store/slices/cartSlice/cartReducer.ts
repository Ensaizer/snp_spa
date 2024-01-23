import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IProduct } from '../../types/ProductType';
import { addOneProductThunk, getOneProductByIdThunk } from './cartThunks';
import type { StateCarts } from '../../../types/products';

const initState: StateCarts = {
  cartItem: [] as IProduct[],
  deleteProducts: [] as IProduct[],
  error: '',
};
const cartItem = createSlice({
  name: 'carts',
  initialState: initState,
  reducers: {
    deleteOneProduct: (state, action: PayloadAction<IProduct>) => {
      state.deleteProducts.push(action.payload);
    },
    deleteAllProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.deleteProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneProductByIdThunk.fulfilled, (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
      state.error = '';
    });
  },
});

// export const { getOneProductById, addOneProduct } = cartItem.actions;

export default cartItem.reducer;
