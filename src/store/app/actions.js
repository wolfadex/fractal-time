import {
  SET_VERTICAL_TIMELINE,
  SET_MODE,
  INITIATE,
  CONNECTED,
  OPEN,
  CHAT_MESSAGE,
} from './types';
import Peer from 'peerjs';

export const setTimelineVertical = (vertical = true) => ({
  type: SET_VERTICAL_TIMELINE,
  vertical,
});

export const setMode = (mode) => ({
  mode,
  type: SET_MODE,
});

export const initialize = () => (dispatch, getState) => {
  const {
    app: { peer },
  } = getState();

  if (!peer) {
    const p = new Peer({ key: 'lwjd5qra8257b9' });

    dispatch({
      peer: p,
      type: INITIATE,
    });

    p.on('connection', (connection) => {
      connection.on('data', (data) => {
        dispatch(data);
      });
    });
    p.on('open', (id) => {
      dispatch({
        id,
        type: OPEN,
      });
    });
  }
};

export const connect = (id) => (dispatch, getState) => {
  const {
    app: { peer, otherPeers },
  } = getState();

  if (!otherPeers[id]) {
    const connection = peer.connect(id);

    connection.on('open', () => {
      dispatch({
        id,
        connection,
        type: CONNECTED,
      });
    });
  }
};

export const sendChat = (text) => ({
  text,
  timestamp: Date.now(),
  type: CHAT_MESSAGE,
});
