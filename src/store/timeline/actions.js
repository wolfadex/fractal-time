import {
  CREATE_HISTORY,
  CREATE_HISTORY_SUCCESS,
  CREATE_HISTORY_FAILURE,
  LOAD_HISTORY,
  LOAD_HISTORY_SUCCESS,
  LOAD_HISTORY_FAILURE,
  SET_FOCUS,
  ADD_PERIOD,
  CHANGE_PERIOD,
  DELETE_PERIOD,
  ADD_SCENE,
  CHANGE_SCENE,
  DELETE_SCENE,
  ADD_EVENT,
  CHANGE_EVENT,
  DELETE_EVENT,
} from './types';
import { setMode } from '../app/actions';
import { APP_MODE } from '../app/types';

export const createHistory = ({ name, start, end }) => (dispatch) => {
  dispatch({ type: CREATE_HISTORY });

  // Create new history
  // firestore
  //   .collection('histories')
  //   .add({
  //     participants: [uid],
  //     name,
  //   })
  //   .then((historyRef) => {
  //     const { description, tone } = start;

  //     // Add start period
  //     firestore
  //       .collection('periods')
  //       .add({
  //         history: historyRef.id,
  //         description,
  //         tone,
  //         order: 0,
  //         title: 'Start',
  //       })
  //       .then(() => {
  //         const { description, tone } = end;

  //         // Add end period
  //         firestore
  //           .collection('periods')
  //           .add({
  //             history: historyRef.id,
  //             description,
  //             tone,
  //             order: 1,
  //             title: 'Start',
  //           })
  //           .then(() => {
  //             dispatch({
  //               id: historyRef.id,
  //               type: CREATE_HISTORY_SUCCESS,
  //             });
  //             dispatch(setMode(APP_MODE.PLAYING));
  //           })
  //           .catch((error) => {
  //             dispatch({
  //               error,
  //               type: CREATE_HISTORY_FAILURE,
  //             });
  //           });
  //       })
  //       .catch((error) => {
  //         dispatch({
  //           error,
  //           type: CREATE_HISTORY_FAILURE,
  //         });
  //       });
  //   })
  //   .catch((error) => {
  //     dispatch({
  //       error,
  //       type: CREATE_HISTORY_FAILURE,
  //     });
  //   });
};

export const loadHistory = () => (dispatch, getState) => {
  dispatch({ type: LOAD_HISTORY });

  const {
    timeline: { historyId },
  } = getState();

  // firestore
  //   .collection('histories')
  //   .doc(historyId)
  //   .get()
  //   .then((doc) => {
  //     dispatch({
  //       data: doc.data(),
  //       type: LOAD_HISTORY_SUCCESS,
  //     });
  //   })
  //   .catch((error) => {
  //     dispatch({
  //       error,
  //       type: LOAD_HISTORY_FAILURE,
  //     });
  //   });
};

export const setFocus = (scale, id) => ({
  id,
  scale,
  type: SET_FOCUS,
});

export const addPeriod = (index, content) => ({
  content,
  index,
  type: ADD_PERIOD,
});

export const changePeriod = (index, content) => ({
  index,
  content,
  type: CHANGE_PERIOD,
});

export const deletePeriod = (index) => ({
  index,
  type: DELETE_PERIOD,
});

export const addScene = (index, content) => ({
  index,
  content,
  type: ADD_SCENE,
});

export const changeScene = (index, content) => ({
  index,
  content,
  type: CHANGE_SCENE,
});

export const deleteScene = (index) => ({ index, type: DELETE_SCENE });

export const addEvent = (index, content) => ({
  index,
  content,
  type: ADD_EVENT,
});

export const changeEvent = (index, content) => ({
  index,
  content,
  type: CHANGE_EVENT,
});

export const deleteEvent = (index) => ({ index, type: DELETE_EVENT });
