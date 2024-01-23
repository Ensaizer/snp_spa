import axios from 'axios';
import type { IProductForm, IProduct } from '../types/ProductType';

export const apiProductsService = axios.create({
  baseURL: 'http://localhost:3000/api/products',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

class ApiProduct {
  static async getOneById(id: string): Promise<IProduct> {
    const { data } = await apiProductsService.get<IProduct>(`/${id}`);
    return data;
  }

  static async getAllProduct(): Promise<IProduct> {
    const { data } = await apiProductsService.get<IProduct>(`/`);
    return data;
  }

  static async deleteOneProductById(id: string): Promise<void> {
    await apiProductsService.delete<IProduct>(`/${id}`);
  }

  static async addOneProduct(formData: IProductForm): Promise<IProduct> {
    const { data } = await apiProductsService.post<IProduct>('/', formData);
    return data;
  }

  static async updateOneProductById(id: string, formData: IProductForm): Promise<IProduct> {
    const { data } = await apiProductsService.patch<IProduct>(`/${id}`, formData);
    return data;
  }

  static async searchProducts(input:string): Promise<IProduct>[] {
    const { data } = await apiProductsService.get<IProduct>(`/search?input=${input}`);
    // const { data } = await apiProductsService.get<IProduct>('/search', input);
    return data;
  }
}

export default ApiProduct;
