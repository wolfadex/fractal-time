import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import app from './app/reducer';
import timeline from './timeline/reducer';
import user from './user/reducer';
import firebase from './firebase/reducer';

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({ app, firebase, timeline, user }),
  composeEnhancers(),
  applyMiddleware(thunk),
);
