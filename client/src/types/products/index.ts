import type { IProduct } from '../ProductType';

export type StateCarts = {
  products: IProduct[];
  deleteProducts: IProduct[];
  error: '';
};
