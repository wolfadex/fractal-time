import {
  SET_FOCUS,
  ADD_PERIOD,
  CHANGE_PERIOD,
  DELETE_PERIOD,
  ADD_SCENE,
  CHANGE_SCENE,
  DELETE_SCENE,
  ADD_EVENT,
  CHANGE_EVENT,
  DELETE_EVENT,
} from './types';

export const setFocus = (scale, id) => ({
  id,
  scale,
  type: SET_FOCUS,
});

export const addPeriod = (index, content) => ({
  content,
  index,
  type: ADD_PERIOD,
});

export const changePeriod = (index, content) => ({
  index,
  content,
  type: CHANGE_PERIOD,
});

export const deletePeriod = (index) => ({
  index,
  type: DELETE_PERIOD,
});

export const addScene = (index, content) => ({
  index,
  content,
  type: ADD_SCENE,
});

export const changeScene = (index, content) => ({
  index,
  content,
  type: CHANGE_SCENE,
});

export const deleteScene = (index) => ({ index, type: DELETE_SCENE });

export const addEvent = (index, content) => ({
  index,
  content,
  type: ADD_EVENT,
});

export const changeEvent = (index, content) => ({
  index,
  content,
  type: CHANGE_EVENT,
});

export const deleteEvent = (index) => ({ index, type: DELETE_EVENT });
