import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IProduct, StateProducts } from '../../types/ProductType';
import { addOneProductThunk, getOneProductByIdThunk } from './ProductThunk';
import type { StateCarts } from '../../../types/products';

const initState: StateCarts = {
  products: [] as IProduct[],
  deleteProducts: [] as IProduct[],
  error: '',
};
const productSlice = createSlice({
  name: 'carts',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneProductByIdThunk.fulfilled, (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
      state.error = '';
    });  
  },
  
});

export const { getOneProductById, addOneProduct } = productSlice.actions;

export default productSlice.reducer;
