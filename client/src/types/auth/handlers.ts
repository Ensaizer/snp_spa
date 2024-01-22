export type LoginHandlerType = (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
export type LogoutHandlerType = () => Promise<void>;
export type RegistrationHandlerType = (e: React.FormEvent<HTMLFormElement>) => Promise<void>;

export type AuthHandlersType = {
  loginHandler: LoginHandlerType;
  logoutHandler: LogoutHandlerType;
  registrationHandler: RegistrationHandlerType;
};