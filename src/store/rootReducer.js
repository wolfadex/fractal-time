import { combineReducers } from 'redux';
import app from './app/reducer';
import timeline from './timeline/reducer';
import user from './user/reducer';

export default combineReducers({ app, timeline, user });
