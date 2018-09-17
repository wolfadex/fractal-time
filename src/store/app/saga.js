import { select, takeEvery, put } from 'redux-saga/effects';
import { CONNECTED, AUTO_CONNECT_REQUEST, BROADCAST_MESSAGE } from './types';
import { connect } from './actions';

function* connectAll({ id }) {
  const {
    app: { otherPeers, peerId },
  } = yield select();

  Object.values(otherPeers).forEach((p) => {
    p.send({
      id: p.peer === id ? peerId : id,
      type: AUTO_CONNECT_REQUEST,
    });
  });
}

function* autoConnectRequest({ id }) {
  yield put(connect(id));
}

function* broadcastMessage({ message }) {
  const {
    app: { otherPeers },
  } = yield select();

  Object.values(otherPeers).forEach((p) => {
    p.send(message);
  });

  yield put(message);
}

function* saga() {
  yield takeEvery(CONNECTED, connectAll);
  yield takeEvery(AUTO_CONNECT_REQUEST, autoConnectRequest);
  yield takeEvery(BROADCAST_MESSAGE, broadcastMessage);
}

export default saga;
