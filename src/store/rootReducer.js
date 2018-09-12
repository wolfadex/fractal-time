import { combineReducers } from 'redux';
import app from './app/reducer';
import timeline from './timeline/reducer';

export default combineReducers({ app, timeline });
