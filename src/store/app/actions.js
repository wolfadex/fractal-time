import {
  SET_VERTICAL_TIMELINE,
  SET_MODE,
  LIST_SESSIONS,
  LIST_SESSIONS_SUCCESS,
  LIST_SESSIONS_FAILURE,
} from './types';
import { firestore } from '../../firebase';

export const setTimelineVertical = (vertical = true) => ({
  type: SET_VERTICAL_TIMELINE,
  vertical,
});

export const setMode = (mode) => ({
  mode,
  type: SET_MODE,
});

export const listSessions = () => (dispatch, getState) => {
  dispatch({ type: LIST_SESSIONS });

  const {
    user: {
      user: { uid },
    },
  } = getState();

  firestore
    .collection('histories')
    .where('participants', 'array-contains', uid)
    .get()
    .then((querySnapshot) => {
      const sessions = [];

      querySnapshot.forEach((doc) => {
        sessions.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      dispatch({
        sessions,
        type: LIST_SESSIONS_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        error,
        type: LIST_SESSIONS_FAILURE,
      });
    });
};
