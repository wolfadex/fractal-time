import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from './types';

const initialState = {
  authenticating: false,
  user: null,
  authenticationError: '',
  unAuthenticating: false,
  unAuthenticationError: '',
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case SIGN_IN:
      return { ...state, authenticating: true, authenticationError: '' };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        authenticating: false,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        authenticationError: payload.error,
        authenticating: false,
      };
    case SIGN_OUT:
      return { ...state, unAuthenticating: true, unAuthenticationError: '' };
    case SIGN_OUT_SUCCESS:
      return { ...state, unAuthenticating: false, user: null };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        unAuthenticating: false,
        unAuthenticationError: payload.error,
      };
    default:
      return state;
  }
};
