import {
  GAME_MODE,
  SET_PLAYER_NAME,
  COPY_STATE,
  CREATE_HISTORY_SUCCESS,
  LOAD_HISTORY_SUCCESS,
  FOCUS_SCALE,
  SET_FOCUS,
  ADD_PERIOD,
  CHANGE_PERIOD,
  DELETE_PERIOD,
  ADD_EVENT,
  CHANGE_EVENT,
  DELETE_EVENT,
  ADD_SCENE,
  CHANGE_SCENE,
  DELETE_SCENE,
  INITIALIZE_NEW_HISTORY,
  NEW_HISTORY_CHANGE_NAME,
  SET_MODE,
} from './types';

const initialState = {
  shared: {
    mode: GAME_MODE.MAIN_MENU,
    playerNames: {},
    // History
    historyName: '',
    periods: [],
    events: [],
    scenes: [],
    // Creating new history
    initializingNewHistory: null, // The user id of the person creating the history
    newHistory: {
      name: '',
      start: {
        description: '',
        tone: true,
      },
      end: {
        description: '',
        tone: true,
      },
    },
  },
  // Meta state
  focusScale: FOCUS_SCALE.ALL_TIME,
  focusId: null,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case SET_MODE:
      return {
        ...state,
        shared: {
          ...state.shared,
          mode: payload.mode,
        },
      };
    case INITIALIZE_NEW_HISTORY:
      return {
        ...state,
        shared: {
          ...state.shared,
          mode: GAME_MODE.NEW_GAME,
          initializingNewHistory: payload.id,
        },
      };
    case NEW_HISTORY_CHANGE_NAME:
      return {
        ...state,
        shared: {
          ...state.shared,
          newHistory: {
            ...state.shared.newHistory,
            name: payload.name,
          },
        },
      };
    case COPY_STATE:
      return {
        ...state,
        shared: {
          ...payload.newState,
          playerNames: {
            ...payload.newState.playerNames,
            [payload.peerId]: state.shared.playerNames[payload.peerId],
          },
        },
      };
    case SET_PLAYER_NAME:
      return {
        ...state,
        shared: {
          ...state.shared,
          playerNames: { ...state.playerNames, [payload.id]: payload.name },
        },
      };
    case CREATE_HISTORY_SUCCESS:
      return { ...state };
    case LOAD_HISTORY_SUCCESS:
      return { ...state };
    case SET_FOCUS:
      return {
        ...state,
        focusScale: payload.scale,
        focusId: payload.id,
      };
    case ADD_PERIOD: {
      // const periods = [...state.periods];

      // periods.splice(payload.index, 0, payload.content);

      // return {
      //   ...state,
      //   periods: periods,
      // };
      return state;
    }
    case CHANGE_PERIOD: {
      // const periods = [...state.periods];

      // periods.splice(payload.index, 1, payload.content);

      // return {
      //   ...state,
      //   periods: periods,
      // };
      return state;
    }
    case DELETE_PERIOD: {
      // const deletedEvents = state.events.reduce((result, { period }, i) => {
      //   if (period === payload.index) {
      //     return [...result, i];
      //   }

      //   return result;
      // }, []);
      // return {
      //   ...state,
      //   periods: [
      //     ...state.periods.slice(0, payload.index),
      //     ...state.periods.slice(payload.index + 1),
      //   ],
      //   events: state.events.filter(({ period }) => period !== payload.index),
      //   scenes: state.scenes.filter(
      //     ({ scene }) => !deletedEvents.includes(scene),
      //   ),
      // };
      return state;
    }
    case ADD_EVENT: {
      // const events = [...state.events];

      // events.splice(payload.index, 0, payload.content);

      // return {
      //   ...state,
      //   events: events,
      // };
      return state;
    }
    case CHANGE_EVENT: {
      // const events = [...state.events];

      // events.splice(payload.index, 1, payload.content);

      // return {
      //   ...state,
      //   events: events,
      // };
      return state;
    }
    case DELETE_EVENT:
      // return {
      //   ...state,
      //   events: [
      //     ...state.events.slice(0, payload.index),
      //     ...state.events.slice(payload.index + 1),
      //   ],
      //   scenes: state.scenes.filter(({ scene }) => scene !== payload.index),
      // };
      return state;
    case ADD_SCENE: {
      // const scenes = [...state.scenes];

      // scenes.splice(payload.index, 0, payload.content);

      // return {
      //   ...state,
      //   scenes: scenes,
      // };
      return state;
    }
    case CHANGE_SCENE: {
      // const scenes = [...state.scenes];

      // scenes.splice(payload.index, 1, payload.content);

      // return {
      //   ...state,
      //   scenes: scenes,
      // };
      return state;
    }
    case DELETE_SCENE:
      // return {
      //   ...state,
      //   scenes: [
      //     ...state.scenes.slice(0, payload.index),
      //     ...state.scenes.slice(payload.index + 1),
      //   ],
      // };
      return state;
    default:
      return state;
  }
};
