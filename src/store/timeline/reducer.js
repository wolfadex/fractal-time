import {
  FOCUS_SCALE,
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
// import { guid } from '../../utils';

const initialState = {
  focusScale: FOCUS_SCALE.ALL_TIME,
  focusId: null,
  periods: [],
  scenes: [],
  events: [],
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
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
      const deletedScenes = state.scenes.reduce((result, { period }, i) => {
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
        scenes: state.scenes.filter(({ period }) => period !== payload.index),
        events: state.events.filter(
          ({ scene }) => !deletedScenes.includes(scene),
        ),
      };
    }
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
        events: state.events.filter(({ scene }) => scene !== payload.index),
      };
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
      };
    default:
      return state;
  }
};
