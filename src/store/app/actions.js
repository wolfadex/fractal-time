import { SET_VERTICAL_TIMELINE } from './types';

export const setTimelineVertical = (vertical = true) => ({
  type: SET_VERTICAL_TIMELINE,
  vertical,
});
