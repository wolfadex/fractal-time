import { APP_MODE, SET_VERTICAL_TIMELINE, SET_MODE } from './types';

const { innerHeight, innerWidth } = window;
const initialState = {
  verticalTimeline: innerWidth <= innerHeight,
  mode: APP_MODE.MAIN_MENU,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case SET_VERTICAL_TIMELINE:
      return {
        ...state,
        verticalTimeline: payload.vertical,
      };
    case SET_MODE:
      return { ...state, mode: payload.mode };
    default:
      return state;
  }
};
