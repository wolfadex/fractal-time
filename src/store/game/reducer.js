import {
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
} from './types';

const initialState = {
  // History
  historyId: null,
  historyName: '',
  periods: [],
  events: [],
  scenes: [],
  // Meta state
  focusScale: FOCUS_SCALE.ALL_TIME,
  focusId: null,

  playerNames: {},
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case COPY_STATE:
      return {
        ...payload.newState,
        playerNames: {
          ...payload.newState.playerNames,
          [payload.peerId]: state.playerNames[payload.peerId],
        },
      };
    case SET_PLAYER_NAME:
      return {
        ...state,
        playerNames: { ...state.playerNames, [payload.id]: payload.name },
      };
    case CREATE_HISTORY_SUCCESS:
      return { ...state, historyId: payload.id };
    case LOAD_HISTORY_SUCCESS:
      console.log('carl', payload);
      return { ...state, historyName: payload.data.name };
    case SET_FOCUS:
      return {
        ...state,
        focusScale: payload.scale,
        focusId: payload.id,
      };
    case ADD_PERIOD: {
      const periods = [...state.periods];

      periods.splice(payload.index, 0, payload.content);

      return {
        ...state,
        periods: periods,
      };
    }
    case CHANGE_PERIOD: {
      const periods = [...state.periods];

      periods.splice(payload.index, 1, payload.content);

      return {
        ...state,
        periods: periods,
      };
    }
    case DELETE_PERIOD: {
      const deletedEvents = state.events.reduce((result, { period }, i) => {
        if (period === payload.index) {
          return [...result, i];
        }

        return result;
      }, []);
      return {
        ...state,
        periods: [
          ...state.periods.slice(0, payload.index),
          ...state.periods.slice(payload.index + 1),
        ],
        events: state.events.filter(({ period }) => period !== payload.index),
        scenes: state.scenes.filter(
          ({ scene }) => !deletedEvents.includes(scene),
        ),
      };
    }
    case ADD_EVENT: {
      const events = [...state.events];

      events.splice(payload.index, 0, payload.content);

      return {
        ...state,
        events: events,
      };
    }
    case CHANGE_EVENT: {
      const events = [...state.events];

      events.splice(payload.index, 1, payload.content);

      return {
        ...state,
        events: events,
      };
    }
    case DELETE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.slice(0, payload.index),
          ...state.events.slice(payload.index + 1),
        ],
        scenes: state.scenes.filter(({ scene }) => scene !== payload.index),
      };
    case ADD_SCENE: {
      const scenes = [...state.scenes];

      scenes.splice(payload.index, 0, payload.content);

      return {
        ...state,
        scenes: scenes,
      };
    }
    case CHANGE_SCENE: {
      const scenes = [...state.scenes];

      scenes.splice(payload.index, 1, payload.content);

      return {
        ...state,
        scenes: scenes,
      };
    }
    case DELETE_SCENE:
      return {
        ...state,
        scenes: [
          ...state.scenes.slice(0, payload.index),
          ...state.scenes.slice(payload.index + 1),
        ],
      };
    default:
      return state;
  }
};
