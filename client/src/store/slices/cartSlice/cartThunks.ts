import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduct, IProductForm } from '../../../types/products';
import ApiProduct from '../../../services/apiProduct';

export const getOneProductByIdThunk = createAsyncThunk(
  'product/getOneProductByIdThunk',
  async (id: IProduct['id']) => ApiProduct.getOneById(id.toString()),
);

export const addOneProductThunk = createAsyncThunk(
  'product/addOneProductThunk',
  async (formData: IProductForm) => ApiProduct.addOneProduct(formData),
);

export const deleteOneProductThunk = createAsyncThunk(
  'product/deleteOneProductThunk',
  async (id: string) => ApiProduct.deleteOneProductById(id),
);

export const updateOneProductByIdThunk = createAsyncThunk(
  'product/updateOneProductByIdThunk',
  async ({ id, formData }: { id: string; formData: IProductForm }) => {
    const data = ApiProduct.updateOneProductById(id, formData);
    return data;
  },
);

export const searchProductsByArticleThunk = createAsyncThunk(
  'product/searchProductsByArticleThunk',
  async (input: string) => ApiProduct.searchProducts(input),
);

export const getAllProduct = createAsyncThunk('product/getAllProduct', async () =>
  ApiProduct.getAllProduct(),
);
