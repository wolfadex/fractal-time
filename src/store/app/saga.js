import { select, takeEvery, put } from 'redux-saga/effects';
import { CONNECTED, AUTO_CONNECT_REQUEST } from './types';
import { connect } from './actions';
import { copyState } from '../game/actions';

function* connectAll({ id }) {
  const {
    app: { otherPeers, peerId },
    game: { shared },
  } = yield select();

  Object.values(otherPeers).forEach((p) => {
    p.send({
      id: p.peer === id ? peerId : id,
      shared,
      type: AUTO_CONNECT_REQUEST,
    });
  });
}

function* autoConnectRequest({ id, shared }) {
  const {
    app: { peerId },
  } = yield select();

  yield put(connect(id));
  yield put(copyState({ newState: shared, peerId }));
}

function* broadcastMessage({ broadcast, ...message }) {
  const {
    app: { otherPeers },
  } = yield select();

  Object.values(otherPeers).forEach((p) => {
    p.send(message);
  });
}

function* saga() {
  yield takeEvery(CONNECTED, connectAll);
  yield takeEvery(AUTO_CONNECT_REQUEST, autoConnectRequest);
  yield takeEvery(({ broadcast }) => broadcast, broadcastMessage);
}

export default saga;
