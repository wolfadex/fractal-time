import { SET_VERTICAL_TIMELINE } from './types';

const { innerHeight, innerWidth } = window;

const initialState = {
  verticalTimeline: innerWidth <= innerHeight,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case SET_VERTICAL_TIMELINE:
      return {
        ...state,
        verticalTimeline: payload.vertical,
      };
    default:
      return state;
  }
};
