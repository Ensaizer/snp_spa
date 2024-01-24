import axios from 'axios';
import type { AuthState, LoginFormData, RegistrationFormData, UserType } from '../types/auth/index';

export const authInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

class AuthService {
  static async refresh(): Promise<AuthState> {
    const response = await authInstance.get<{ user: UserType; accessToken: string }>(
      '/tokens/refresh',
    );

    const authState: AuthState = {
      ...response.data,
      user: { ...response.data.user, status: 'authenticated' },
    };
    return authState;
  }

  static async login(formData: LoginFormData): Promise<AuthState> {
    const response = await authInstance.post<{ user: UserType; accessToken: string }>(
      '/auth/login',
      formData,
    );
    const authState: AuthState = {
      ...response.data,
      user: { ...response.data.user, status: 'authenticated' },
    };
    return authState;
  }

  static async registration(formData: RegistrationFormData): Promise<AuthState> {
    const response = await authInstance.post<{ user: UserType; accessToken: string }>(
      '/auth/registration',
      formData,
    );
    const authState: AuthState = {
      ...response.data,
      user: { ...response.data.user, status: 'authenticated' },
    };
    return authState;
  }

  static async logout(): Promise<void> {
    try {
      await authInstance.get('/auth/logout');
    } catch (error) {
      console.log(error);
    }
  }

  static async check(): Promise<AuthState> {
    const response = await authInstance.get<{ user: UserType; accessToken: string }>('/auth/check');
    const authState: AuthState = {
      ...response.data,
      user: { ...response.data.user, status: 'authenticated' },
    };
    return authState;
  }
}

export default AuthService;
