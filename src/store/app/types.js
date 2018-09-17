export const APP_MODE = {
  MAIN_MENU: 'MAIN_MENU',
  NEW_SESSION: 'NEW_SESSION',
  JOIN_SESSION: 'JOIN_SESSION',
  LOAD_SESSION: 'LOAD_SESSION',
  IMPORT_SESSION: 'IMPORT_SESSION',
  PLAYING: 'PLAYING',
};

const prefix = '@@APP_';

export const SET_VERTICAL_TIMELINE = `${prefix}SET_VERTICAL_TIMELINE`;

export const SET_MODE = `${prefix}SET_MODE`;

export const LIST_SESSIONS = `${prefix}LIST_SESSIONS`;
export const LIST_SESSIONS_SUCCESS = `${prefix}LIST_SESSIONS_SUCCESS`;
export const LIST_SESSIONS_FAILURE = `${prefix}LIST_SESSIONS_FAILURE`;

export const INITIATE = `${prefix}INITIATE`;
export const CONNECTED = `${prefix}CONNECTED`;
export const OPEN = `${prefix}OPEN`;
export const BROADCAST_MESSAGE = `${prefix}BROADCAST_MESSAGE`;
export const AUTO_CONNECT_REQUEST = `${prefix}AUTO_CONNECT_REQUEST`;
export const CHAT_MESSAGE = `${prefix}CHAT_MESSAGE`;
