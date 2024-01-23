import type { IProduct } from '../ProductType';

export type StateCarts = {
  cartItems: IProduct[];
  deleteProducts: IProduct[];
  error: '';
};
