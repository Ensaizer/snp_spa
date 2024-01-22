export type UserType = {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    userType: string;
    deliveryAddress: string;
    discount: number;
    roleId: number;
    isApproved:boolean;
    orgName?: string;
    INN?: string;
    KPP?: string;
    OGRN?: string;
    legalAddress?: string;
    currAccount?: string;
    corrAccount?: string;
  };
  
  export type UserState =
    | { status: 'pending' }
    | { status: 'guest' }
    | ({ status: 'authenticated' } & UserType);
  
  export type AuthState = {
    user: UserState;
    accessToken: string;
  };
  
  export type AuthActions =
    | { type: 'LOGIN'; payload: AuthState }
    | { type: 'LOGOUT' }
    | { type: 'LOGIN_GUEST' }
  
  export type LoginFormData = {
    email: string;
    password: string;
  };
  
  export type RegistrationFormData = {
    email: string;
    name: string;
    password: string;
    phone: string;
    userType: string;
    deliveryAddress: string;
    roleId: number;
    orgName?: string;
    INN?: string;
    KPP?: string;
    OGRN?: string;
    legalAddress?: string;
    currAccount?: string;
    corrAccount?: string;
  };