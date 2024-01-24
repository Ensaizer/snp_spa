export type CategoryType = {
  id: number;
  name: string;
};

export type OrganizationType = {
  orgName: string;
  INN: string;
  KPP: string;
  OGRN: string;
  legalAddress: string;
  currAccount: string;
  corrAccount: string;
};

export type OrderType ={
  id: number;
  userId: number;
  status:string;
  deliveryAddress: string;
  deliveryType: string;
  paymentType:string;
}

export type OrderFormType = {
  userId?: number;
  status?: string;
  deliveryAddress: string;
  deliveryType: string;
  paymentType:string;
}
