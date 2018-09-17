import {
  APP_MODE,
  SET_VERTICAL_TIMELINE,
  SET_MODE,
  LIST_SESSIONS_SUCCESS,
  INITIATE,
  CONNECTED,
  CARL,
  OPEN,
} from './types';

const { innerHeight, innerWidth } = window;
const initialState = {
  verticalTimeline: innerWidth <= innerHeight,
  mode: APP_MODE.MAIN_MENU,
  sessions: [],

  peer: null,
  peerId: null,
  otherPeers: [],
  carl: '',
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case INITIATE:
      return { ...state, peer: payload.peer };
    case OPEN:
      return { ...state, peerId: payload.id };
    case CONNECTED:
      return {
        ...state,
        otherPeers: [...state.otherPeers, payload.connection],
      };
    case CARL:
      return { ...state, carl: payload.body };
    case SET_VERTICAL_TIMELINE:
      return {
        ...state,
        verticalTimeline: payload.vertical,
      };
    case SET_MODE:
      return { ...state, mode: payload.mode };
    case LIST_SESSIONS_SUCCESS:
      return { ...state, sessions: payload.sessions };
    default:
      return state;
  }
};
