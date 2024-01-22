import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IProduct, StateProducts } from '../../types/ProductType';
import { addOneProductThunk, getOneProductByIdThunk } from './ProductThunk';

const initState: StateProducts = {
  products: [] as IProduct[],
  activeProduct: {} as IProduct,
  error: '',
  isLoading: false,
};
const productSlice = createSlice({
  name: 'products',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneProductByIdThunk.fulfilled, (state, action: PayloadAction<IProduct>) => {
      state.activeProduct = action.payload;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(getOneProductByIdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneProductByIdThunk.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.error.message as string;
      state.isLoading = false;
    });
    builder.addCase(addOneProductThunk.fulfilled, (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.unshift(action.payload);
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(addOneProductThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(addOneProductThunk.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload.errorMessage;
      state.isLoading = false;
    });
  },
});

export const { getOneProductById, addOneProduct } = productSlice.actions;

export default productSlice.reducer;
