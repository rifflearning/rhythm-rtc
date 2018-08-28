import {
  DASHBOARD_UPDATE_MEETING_LIST,
  DASHBOARD_FETCH_MEETINGS,
  DASHBOARD_SELECT_MEETING,
  DASHBOARD_FETCH_MEETING_STATS
} from '../constants/ActionTypes';
import _ from 'underscore';

import { app, socket} from "../../riff";

export const updateMeetingList = (meetings) => {
  return {type: DASHBOARD_FETCH_MEETINGS,
          status: 'loaded',
          meetings: meetings};
};

export const selectMeeting = (meeting) => {
  return {type: DASHBOARD_SELECT_MEETING,
          meeting: meeting};
};

export const loadRecentMeetings = (uid) => dispatch => {
  dispatch({type: DASHBOARD_FETCH_MEETINGS, status: 'loading'});
  return app.service('participants').find({query: {_id: uid}}).then((res) => {
    console.log(">>fetched participant:", res);
    return res.data[0];
  }).then((participant) => {
    return participant.meetings;
  }).then((meetingIds) => {
    return app.service('meetings').find({query: {_id: meetingIds}});
  }).then((meetingObjects) => {
    dispatch(updateMeetingList(meetingObjects));
    console.log("got meeting objects:", meetingObjects);
  }).catch((err) => {
    console.log("Couldn't retrieve meetings", err);
  });
};

let processUtterances = (utterances) => {
  console.log("processing utterances:", utterances);
  // {'participant': [utteranceObject, ...]}
  var participantUtterances = _.groupBy(utterances, 'participant');
  // {'participant': number of utterances}
  var numUtterances = _.mapObject(participantUtterances, (val, key) => {
    return val.length;
  });
  // {'participant': mean length of utterances in seconds}
  var meanLengthUtterances = _.mapObject(participantUtterances, (val, key) => {
    var lengthsUtterances = val.map((utteranceObject) => {
      return (new Date(utteranceObject.endTime).getTime() - new Date(utteranceObject.startTime).getTime()) / 1000;
    });
    var sum = lengthsUtterances.reduce((previous, current) => current + previous, 0);
    return sum / lengthsUtterances.length;
  });
  let participants = Object.keys(participantUtterances);

  var visualizationData = participants.map((participantId) => {
    return {
      //    name: participant['name'],
      participantId: participantId,
      numUtterances: participantId in numUtterances ? numUtterances[participantId] : 0,
      meanLengthUtterances: participantId in meanLengthUtterances ? meanLengthUtterances[participantId] : 0
    };
  });
  console.log("data returned:", visualizationData);
  return visualizationData;
};

export const loadMeetingData = (meetingId) => dispatch => {
  dispatch({type: DASHBOARD_FETCH_MEETING_STATS, status: 'loading'});
  console.log("finding utterances for meeting", meetingId);
  return app.service('utterances').find({query: {meeting: meetingId, $limit: 1000}})
    .then((utterances) => {
      return processUtterances(utterances);
    }).then(processedUtterances => {
      dispatch({type: DASHBOARD_FETCH_MEETING_STATS,
                status: 'loaded',
                processedUtterances: processedUtterances});
    }).catch(err => {
      console.log("couldn't retrieve meeting data", err);
    });
};
