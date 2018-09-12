export const FOCUS_SCALE = {
  ALL_TIME: 'ALL_TIME',
  PERIOD: 'PERIOD',
  SCENE: 'SCENE',
  EVENT: 'EVENT',
};

const prefix = '@@TIMELINE_';

export const SET_FOCUS = `${prefix}SET_FOCUS`;

export const ADD_PERIOD = `${prefix}ADD_PERIOD`;
export const CHANGE_PERIOD = `${prefix}CHANGE_PERIOD`;
export const DELETE_PERIOD = `${prefix}DELETE_PERIOD`;
export const ADD_SCENE = `${prefix}ADD_SCENE`;
export const CHANGE_SCENE = `${prefix}CHANGE_SCENE`;
export const DELETE_SCENE = `${prefix}DELETE_SCENE`;
export const ADD_EVENT = `${prefix}ADD_EVENT`;
export const CHANGE_EVENT = `${prefix}CHANGE_EVENT`;
export const DELETE_EVENT = `${prefix}DELETE_EVENT`;
