import {
  SET_PLAYER_NAME,
  COPY_STATE,
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
  INITIALIZE_NEW_HISTORY,
  NEW_HISTORY_CHANGE_NAME,
  NEW_HISTORY_CHANGE_START_DESCRIPTION,
  NEW_HISTORY_CHANGE_START_TONE,
  NEW_HISTORY_CHANGE_END_DESCRIPTION,
  NEW_HISTORY_CHANGE_END_TONE,
  SET_MODE,
  GAME_MODE,
} from './types';

export const setPlayerName = ({ id, name }) => ({
  id,
  name,
  broadcast: true,
  type: SET_PLAYER_NAME,
});

export const copyState = ({ newState, peerId }) => ({
  newState,
  peerId,
  type: COPY_STATE,
});

export const setMode = (mode) => ({
  mode,
  type: SET_MODE,
});

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

export const initializeNewHistory = () => (dispatch, getState) => {
  const {
    app: { peerId },
  } = getState();

  dispatch({
    id: peerId,
    broadcast: true,
    type: INITIALIZE_NEW_HISTORY,
  });
};

export const changeName = (name) => ({
  name,
  broadcast: true,
  type: NEW_HISTORY_CHANGE_NAME,
});
// export const NEW_HISTORY_CHANGE_START_DESCRIPTION = () => ({});
// export const NEW_HISTORY_CHANGE_START_TONE = () => ({});
// export const NEW_HISTORY_CHANGE_END_DESCRIPTION = () => ({});
// export const NEW_HISTORY_CHANGE_END_TONE = () => ({});
