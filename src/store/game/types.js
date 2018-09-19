export const FOCUS_SCALE = {
  ALL_TIME: 'ALL_TIME',
  PERIOD: 'PERIOD',
  SCENE: 'SCENE',
  EVENT: 'EVENT',
};

export const GAME_MODE = {
  MAIN_MENU: 'MAIN_MENU',
  NEW_GAME: 'NEW_GAME',
  PLAYING: 'PLAYING',
};

const prefix = '@@TIMELINE_';

export const SET_MODE = `${prefix}SET_MODE`;

export const CREATE_HISTORY = `${prefix}CREATE_HISTORY`;
export const CREATE_HISTORY_SUCCESS = `${prefix}CREATE_HISTORY_SUCCESS`;
export const CREATE_HISTORY_FAILURE = `${prefix}CREATE_HISTORY_FAILURE`;

export const LOAD_HISTORY = `${prefix}LOAD_HISTORY`;
export const LOAD_HISTORY_SUCCESS = `${prefix}LOAD_HISTORY_SUCCESS`;
export const LOAD_HISTORY_FAILURE = `${prefix}LOAD_HISTORY_FAILURE`;

export const CHANGE_HISTORY = `${prefix}CHANGE_HISTORY`;

export const DELETE_HISTORY = `${prefix}DELETE_HISTORY`;

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

export const SET_PLAYER_NAME = `${prefix}SET_PLAYER_NAME`;

export const COPY_STATE = `${prefix}COPY_STATE`;

export const INITIALIZE_NEW_HISTORY = `${prefix}INITIALIZE_NEW_HISTORY`;
export const NEW_HISTORY_CHANGE_NAME = `${prefix}NEW_HISTORY_CHANGE_NAME`;
export const NEW_HISTORY_CHANGE_START_DESCRIPTION = `${prefix}NEW_HISTORY_CHANGE_START_DESCRIPTION`;
export const NEW_HISTORY_CHANGE_START_TONE = `${prefix}NEW_HISTORY_CHANGE_START_TONE`;
export const NEW_HISTORY_CHANGE_END_DESCRIPTION = `${prefix}NEW_HISTORY_CHANGE_END_DESCRIPTION`;
export const NEW_HISTORY_CHANGE_END_TONE = `${prefix}NEW_HISTORY_CHANGE_END_TONE`;
