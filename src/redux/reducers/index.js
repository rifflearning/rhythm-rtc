import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';

import auth from './auth';
import chat from './chat';
import dashboard from './dashboard';
import lti from './lti';
import makeMeeting from './makeMeeting';
import menu from './menu';
import profile from './profile';
import riff from './riff';

import browserHistory from "../../history";


const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['router', 'chat', 'riff', 'dashboard']
};

// we want our webRTC peers to be populated by our server,
// not state.
const chatPersistConfig = {
  key: 'chat',
  storage: storage,
  blacklist: ['webRtcPeers', 'webRtcRiffIds', 'volume', 'roomName',
              'inRoom', 'joiningRoom', 'getMediaError',
              'savedDisplayName']
};

const dashPersistConfig = {
  key: 'dashboard',
  storage: storage,
  blacklist: ['shouldFetch', 'fetchMeetingStatus', 'statsStatus']
};

const profilePersistConfig = {
  key: 'profile',
  storage: storage,
  blacklist: ['changeEmailStatus', 'changeEmailMessage', 'emailInput']
};

export default persistReducer(
  rootPersistConfig,
  connectRouter(browserHistory)(
    combineReducers({
      auth: auth,
      lti: lti,
      riff: riff,
      menu: menu,
      dashboard: dashboard,
      chat: persistReducer(chatPersistConfig, chat),
      profile: persistReducer(profilePersistConfig, profile),
      makeMeeting: makeMeeting
    })));
