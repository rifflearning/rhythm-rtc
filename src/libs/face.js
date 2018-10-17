import { logger } from './utils';
const Thumos = require('thumos');

export default function trackFace(app, user, roomname, videoId) {

  logger.debug("trackFace: starting to track facial movement!");

  let faceOverlay = window.client_config.faceTracking.overlay;
  let faceEventFreq = window.client_config.faceTracking.eventFrequency;

  var faceEvents = new Thumos(videoId,
      'video-overlay',
      faceOverlay,
      faceEventFreq);
  faceEvents.bind('faceMoving', function (data) {
    app.service('faces').create({
      'participant': user,
      'room': roomname,
      'timestamp': data.time.toISOString(),
      'x_array': data.xArray,
      'y_array': data.yArray,

    }).then(function (res) {
      logger.debug('trackFace: face movement event is being emitted!!! ', res);
    }).catch(function (err) {
      logger.error('ERROR: ', err);
    });
  });

}
