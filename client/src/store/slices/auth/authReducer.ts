import type { AuthActions, AuthState } from '../../../types/auth';

const guestState: AuthState = { accessToken: '', user: { status: 'guest' } };
const initState: AuthState = { accessToken: '', user: { status: 'pending' } };

// eslint-disable-next-line @typescript-eslint/default-param-last
const authReducer = (state: AuthState = initState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;

    case 'LOGIN_GUEST':
      return guestState;

    case 'LOGOUT':
      return guestState;
    default:
      return state;
  }
};

export default authReducer;