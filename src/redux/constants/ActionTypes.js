// action types
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGIN_ANONYMOUS = 'LOGIN_ANONYMOUS';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const INPUT_STATE_CHANGE = 'INPUT_STATE_CHANGE';
export const LOG_OUT = 'LOG_OUT';

export const OPEN_NAV_MENU = 'OPEN_NAV_MENU';
export const CLOSE_NAV_MENU = 'CLOSE_NAV_MENU';

export const MAKE_MEETING_INPUT_CHANGE = 'CHAT::MAKE_MTG_INPUT_CHANGE';
export const JOIN_ROOM = 'CHAT::JOIN_ROOM';

export const CHAT_SHARE_STREAM = 'CHAT::SHARE_STREAM';
export const CHAT_DISPLAY_NAME_CHANGE = 'CHAT::DISPLAY_NAME_CHANGE';
export const CHAT_GET_MEDIA_ERROR = 'CHAT::GET_MEDIA_ERROR';
export const CHAT_START_WEBRTC = 'CHAT::START_WEBRTC';
export const CHAT_SET_WEBRTC_CONFIG = 'CHAT::SET_WEBRTC_CONFIG';
export const CHAT_READY_TO_CALL = 'CHAT::READY_TO_CALL';
export const CHAT_LEAVE_ROOM = 'CHAT::LEAVE_ROOM';
export const CHAT_CHANGE_ROOM_NAME = 'CHAT::CHANGE_ROOM_NAME';
export const CHAT_CHANGE_DISPLAY_NAME = 'CHAT::CHANGE_DISPLAY_NAME';
export const CHAT_CHANGE_PEER_DISPLAY_NAME = 'CHAT::CHANGE_PEER_DISPLAY_NAME';
export const CHAT_JOIN_ROOM_ERROR = 'CHAT::JOIN_ROOM_ERROR';
export const CHAT_CLEAR_JOIN_ROOM_ERROR = 'CHAT::CLEAR_JOIN_ROOM_ERROR';
export const CHAT_VOLUME_CHANGED = 'CHAT::VOLUME_CHANGED';
export const CHAT_WEBRTC_ID_CHANGE = 'CHAT::WEBRTC_ID_CHANGE';
export const CHAT_CHANGE_PEER_RIFF_ID = 'CHAT::CHANGE_PEER_RIFF_ID';
export const JOINING_ROOM = 'CHAT::JOINING_ROOM';
export const JOINED_ROOM = 'CHAT::JOINED_ROOM';
export const IN_ROOM = 'CHAT::IN_ROOM';
export const MUTE_AUDIO = 'CHAT::MUTE_AUDIO';
export const UNMUTE_AUDIO = 'CHAT::UNMUTE_AUDIO';
export const MUTE_VIDEO = 'CHAT::MUTE_VIDEO';
export const ADD_PEER = 'CHAT::ADD_PEER';
export const REMOVE_PEER = 'CHAT::REMOVE_PEER';

export const RIFF_AUTHENTICATE_SUCCESS = 'RIFF::AUTHENTICATE_SUCCESS';
export const RIFF_AUTHENTICATE_FAIL = 'RIFF::AUTHENTICATE_FAIL';
export const RIFF_PARTICIPANTS_CHANGED = 'RIFF:PARTICIPANTS_CHANGED';
export const RIFF_TURN_UPDATE = 'RIFF:TURN_UPDATE';
export const RIFF_MEETING_ID_UPDATE = 'RIFF:MEETING_ID_UPDATE';

export const RHYTHM_AUTHENTICATE = 'RHYTHM::AUTHENTICATE';
export const RHYTHM_AUTHENTICATE_SUCCESS = 'RHYTHM::AUTHENTICATE_SUCCESS';
export const RHYTHM_AUTHENTICATE_FAIL = 'RHYTHM::AUTHENTICATE_FAIL';

export const DASHBOARD_FETCH_MEETINGS = 'DASHBOARD::FETCH_MEETINGS';
export const DASHBOARD_FETCH_MEETING_STATS = 'DASHBOARD::FETCH_MEETING_STATS';
export const DASHBOARD_FETCH_MEETING_NETWORK = "DASHBOARD::FETCH_MEETING_NETWORK";
export const DASHBOARD_FETCH_MEETING_TIMELINE = "DASHBOARD::FETCH_MEETING_TIMELINE";
export const DASHBOARD_SELECT_MEETING = 'DASHBOARD::SELECT_MEETING';
export const DASHBOARD_UPDATE_MEETING_LIST = "DASHBOARD::UPDATE_MEETING_LIST";


export const CHANGE_EMAIL = "PROFILE::CHANGE_EMAIL";
export const CHANGE_EMAIL_INPUT = "PROFILE::CHANGE_EMAIL_INPUT";

export const LTI_LOGIN_USER = "LTI::LOGIN_USER";
export const LTI_LOGOUT_USER = "LTI::LOGOUT_USER";

export const TEXT_CHAT_MSG_UPDATE = "TEXTCHAT::UPDATE_MESSAGE";
