import { createSlice } from '@reduxjs/toolkit';
import type { IProduct, StateProducts } from '../../types/ProductType';
import {
  addOneProductThunk,
  getOneProductByIdThunk,
  updateOneProductByIdThunk,
} from './ProductThunk';

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
    builder.addCase(getOneProductByIdThunk.fulfilled, (state, action) => {
      state.activeProduct = action.payload;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(getOneProductByIdThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getOneProductByIdThunk.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.isLoading = false;
    });
    builder.addCase(addOneProductThunk.fulfilled, (state, action) => {
      state.products = state.products.unshift(action.payload);
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(addOneProductThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(addOneProductThunk.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.isLoading = false;
    });
    builder.addCase(updateOneProductByIdThunk.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.isLoading = false;
    });
    builder.addCase(updateOneProductByIdThunk.fulfilled, (state, action) => {
      state.activeProduct = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateOneProductByIdThunk.pending, (state) => {
      state.error = '';
      state.isLoading = true;
    });
  },
});

export default productSlice.reducer;
