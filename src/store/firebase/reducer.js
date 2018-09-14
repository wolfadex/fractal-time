import {
  CHECK_WEBRTC,
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  NEW_CONNECTION,
  JOIN_ROOM,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE,
  ROOM_CLOSED,
  DISCONNECT,
  CONNECTION_CLOSED,
  CHANNEL_OPEN,
} from './types';

const initialState = {
  webRTCAvailable: null,

  creatingRoom: false,
  roomId: null,

  joiningRoom: false,

  roomReady: false,

  othersInRoom: [],
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case CHECK_WEBRTC:
      return { ...state, webRTCAvailable: payload.available };
    case CREATE_ROOM:
      return { ...state, creatingRoom: true, roomId: null };
    case CREATE_ROOM_SUCCESS:
      return { ...state, creatingRoom: false, roomId: payload.roomId };
    case CREATE_ROOM_FAILURE:
      return { ...state, creatingRoom: false };
    case NEW_CONNECTION:
      return { ...state, othersInRoom: payload.others };
    case JOIN_ROOM:
      return { ...state, joiningRoom: true, roomId: payload.roomId };
    case JOIN_ROOM_SUCCESS:
      return { ...state, joiningRoom: false };
    case JOIN_ROOM_FAILURE:
      return { ...state, joiningRoom: false };
    case ROOM_CLOSED:
      return { ...state };
    case DISCONNECT:
      return { ...state };
    case CONNECTION_CLOSED:
      return { ...state };
    case CHANNEL_OPEN:
      return { ...state, roomReady: true };
    default:
      return state;
  }
};
