import AuthService from '../../../services/authService';
import type { AuthState, LoginFormData, RegistrationFormData } from '../../../types/auth';
import type { AppDispatch } from '../../store';
import { clearError, login, logout, refresh, setError, setModal } from './authSlice';

export const loginHandlerThunk =
  (e: React.FormEvent<HTMLFormElement>) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(
        new FormData(e.currentTarget),
      ) as unknown as LoginFormData;
      const authState = await AuthService.login(formData);
      dispatch(login(authState));
      dispatch(setModal());
      dispatch(clearError());
    } catch (err) {
      console.error(err.response.data.message);
      dispatch(setError(err.response.data.message));
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
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

export const logoutHandlerThunk =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    await AuthService.logout();
    dispatch(logout());
  };

export const userCheckThunk = () => async (dispatch: AppDispatch) => {
  try {
    const data = await AuthService.check();
    dispatch(login(data));
  } catch (error) {
    dispatch(logout());
  }
};

export const refreshThunk =
  () =>
  async (dispatch: AppDispatch): Promise<AuthState['accessToken']> => {
    const refreshedAuth = await AuthService.refresh();
    dispatch(refresh(refreshedAuth.accessToken));
    return refreshedAuth.accessToken;
  };
