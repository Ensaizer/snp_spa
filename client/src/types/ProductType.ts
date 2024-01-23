export type IProduct = {
  id: number;
  article: string;
  brandId: number;
  categoryId: number;
  deliveryTime: number;
  name: string;
  description: string;
  minOrder: number;
  multiplicity: number;
  price: number;
  stock: number;
};

export type IProductForm = Omit<IProduct, 'id'>;

export type StateProducts = {
  products: IProduct[];
  activeProduct: IProduct;
  error: string;
  isLoading: boolean;
  foundProducts: IProduct[];
};
