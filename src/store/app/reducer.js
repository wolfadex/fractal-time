import {
  SET_VERTICAL_TIMELINE,
  INITIATE,
  CONNECTED,
  OPEN,
  CHAT_MESSAGE,
} from './types';

const { innerHeight, innerWidth } = window;
const initialState = {
  verticalTimeline: innerWidth <= innerHeight,

  peer: null,
  peerId: null,
  otherPeers: {},

  chat: {},
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
        otherPeers: { ...state.otherPeers, [payload.id]: payload.connection },
      };
    case SET_VERTICAL_TIMELINE:
      return {
        ...state,
        verticalTimeline: payload.vertical,
      };
    case CHAT_MESSAGE:
      return {
        ...state,
        chat: { ...state.chat, [payload.timestamp]: payload.text },
      };
    default:
      return state;
  }
};
