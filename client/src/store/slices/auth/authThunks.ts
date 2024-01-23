import AuthService from '../../../services/authService';
import type { AuthState, LoginFormData, RegistrationFormData } from '../../../types/auth';
import type { AppDispatch } from '../../store';
import { login, logout, refresh } from './authSlice';

export const loginHandlerThunk =
  (e: React.FormEvent<HTMLFormElement>) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(
        new FormData(e.currentTarget),
      ) as unknown as LoginFormData;
      const authState = await AuthService.login(formData);
      // dispatch({ type: 'LOGIN', payload: authState });
      dispatch(login(authState));
    } catch (err) {
      console.error(err);
      dispatch(logout());
    }
  };

export const registrationHandlerThunk =
  (e: React.FormEvent<HTMLFormElement>) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(
        new FormData(e.currentTarget),
      ) as unknown as RegistrationFormData;
      const authState = await AuthService.registration(formData);
      dispatch(login(authState));
      // dispatch({ type: 'LOGIN', payload: authState });
    } catch (err) {
      console.error(err);
      // dispatch({ type: 'LOGIN_GUEST' });
    }
  };

export const logoutHandlerThunk =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    await AuthService.logout();
    // dispatch({ type: 'LOGOUT' });
    dispatch(logout());
  };

export const userCheckThunk = () => async (dispatch: AppDispatch) => {
  // const data = await AuthService.check();
  // dispatch({ type: 'LOGIN', payload: data });
  try {
    const data = await AuthService.check();
    dispatch(login(data));
  } catch (error) {
    dispatch(logout());
  }
};

// export const refreshAuthThunk = () => async (dispatch: AppDispatch): Promise<AuthState['accessToken']> => {
//     const refreshedAuth = await AuthService.refresh();
//     dispatch({ type: 'LOGIN', payload: refreshedAuth });
//     return refreshedAuth.accessToken;
//   };

export const refreshThunk =
  () =>
  async (dispatch: AppDispatch): Promise<AuthState['accessToken']> => {
    const refreshedAuth = await AuthService.refresh();
    dispatch(refresh(refreshedAuth.accessToken));
    return refreshedAuth.accessToken;
  };