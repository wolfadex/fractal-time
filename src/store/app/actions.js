import { SET_VERTICAL_TIMELINE, SET_MODE } from './types';

export const setTimelineVertical = (vertical = true) => ({
  type: SET_VERTICAL_TIMELINE,
  vertical,
});

export const setMode = (mode) => ({
  mode,
  type: SET_MODE,
});
