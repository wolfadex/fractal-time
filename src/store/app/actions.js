import {
  SET_VERTICAL_TIMELINE,
  SET_MODE,
  INITIATE,
  CONNECTED,
  CARL,
  OPEN,
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
        console.log('carl', data);
        dispatch(JSON.parse(data));
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
    app: { peer },
  } = getState();
  const connection = peer.connect(id);

  connection.on('open', () => {
    dispatch({
      connection,
      type: CONNECTED,
    });
  });
};

export const sendMessage = (message) => (dispatch, getState) => {
  const {
    app: { otherPeers },
  } = getState();

  otherPeers.forEach((peer) => {
    peer.send(JSON.stringify(message));
  });
};
