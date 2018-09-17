import { select, takeEvery, put } from 'redux-saga/effects';
import { CONNECTED, AUTO_CONNECT_REQUEST } from './types';
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

function* saga() {
  yield takeEvery(CONNECTED, connectAll);
  yield takeEvery(AUTO_CONNECT_REQUEST, autoConnectRequest);
}

export default saga;
