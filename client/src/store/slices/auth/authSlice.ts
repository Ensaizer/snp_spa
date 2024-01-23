// import type { AuthActions, AuthState } from '../../../types/auth';

// const guestState: AuthState = { accessToken: '', user: { status: 'guest' } };
// const initState: AuthState = { accessToken: '', user: { status: 'pending' } };

// // eslint-disable-next-line @typescript-eslint/default-param-last
// const authReducer = (state: AuthState = initState, action: AuthActions): AuthState => {
//   switch (action.type) {
//     case 'LOGIN':
//       return action.payload;

//     case 'LOGIN_GUEST':
//       return guestState;

//     case 'LOGOUT':
//       return guestState;
//     default:
//       return state;
//   }
// };

// export default authReducer;
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../../types/auth';

const initialState: AuthState = { accessToken: '', user: { status: 'pending' } };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = '';
      state.user = { status: 'guest' };
    },
    refresh: (state, action: PayloadAction<AuthState['accessToken']>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, refresh} = authSlice.actions;

export default authSlice.reducer;