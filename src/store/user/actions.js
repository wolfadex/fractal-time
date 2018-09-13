import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from './types';
import firebase, { auth } from '../../firebase';

const providerGoogle = new firebase.auth.GoogleAuthProvider();

export const signIn = () => (dispatch) => {
  dispatch({ type: SIGN_IN });
  // TODO: Support other providers
  auth.signInWithPopup(providerGoogle).catch((error) => {
    dispatch({
      error,
      type: SIGN_IN_FAILURE,
    });
  });
};

export const authStateChange = (user) => {
  if (user) {
    return {
      user,
      type: SIGN_IN_SUCCESS,
    };
  }

  return { type: '' };
};

export const signOut = () => (dispatch) => {
  dispatch({ type: SIGN_OUT });

  auth
    .signOut()
    .then(() => {
      dispatch({ type: SIGN_OUT_SUCCESS });
    })
    .catch((error) => {
      dispatch({
        error,
        type: SIGN_OUT_FAILURE,
      });
    });
};
