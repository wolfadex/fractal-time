import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import app from './app/reducer';
import appSaga from './app/saga';
import game from './game/reducer';

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({ app, game }),
  composeEnhancers(),
  applyMiddleware(thunk, sagaMiddleware),
);

sagaMiddleware.run(appSaga);
