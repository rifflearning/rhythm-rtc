/* ******************************************************************************
 * ltilaunch.js                                                                 *
 * *************************************************************************/ /**
 *
 * @fileoverview Express route handler for launching Riff via LTI (Learning Tool Integrations)
 *
 * [More detail about the file's contents]
 *
 * Created on       September 12, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Riff Learning,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

const util = require('util');

const config = require('config');

const request = require('request');
const lti = require("ims-lti");
const redis = require("redis");

const { expressAsyncHandler } = require('../utils/express_asynchandler');


/* **************************************************************************
 * asyncLtiLaunch                                                      */ /**
 *
 * Decrypt the LTI packet and return information needed for the user
 * to login and start a video chat.
 *
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 *
 * @returns {Promise} resolved when the lti post has been handled by
 *    sending an error response if there were problems validating or by
 *    populating the session.ltiData with the lti launch parameters.
 */
async function asyncLtiLaunch(req, res, next)
{
  const logger = req.app.get('routerLogger').child({ route_handler: 'ltiLaunch' });

  logger.debug({ req, reqUrl: req.url, reqOrigUrl: req.originalUrl, body: req.body }, 'ltiLaunch entered...');

  let ltiProvider = null;
  try
  {
    if (!req.body || !req.body.oauth_consumer_key)
      throw new Error('Request body did not contain an oauth_consumer_key value!');

    ltiProvider = getLtiProvider(req.body.oauth_consumer_key, logger);
  }
  catch (e)
  {
    let errmsg = 'Could not configure LTI Provider, check consumer key and LMS list!';
    if (!(e instanceof LoggedError))
    {
      logger.error(e.toString());
      logger.debug({ err: e });
    }

    res.status(400); // Bad Request
    return res.send(errmsg);
  }

  req.session.body = req.body;

  let isValidRequest = util.promisify(ltiProvider.valid_request);

  try
  {
    // collect the data we're interested in from the request
    //
    // Some info on the IDs in the req body:
    //   https://www.imsglobal.org/best-practices-managing-ids-lti
    // It looks like the context_id is the course section id or
    // is at least expected to be a unique identifier for the course
    // section.
    // Definitions from the above link:
    //   "A course template is the abstract course which is independent of
    //   when it is taught. A course offering relates to the specific
    //   period of time when the course is available. A course section is
    //   the specific instance into which students are enrolled and taught.
    //   The course template may have one or more course offerings, each of
    //   which may have one or more course sections."
    req.session.ltiData =
      {
        lti_user: true,
        is_valid: await isValidRequest(req),
        group: 'riff_group1',
        user:
        {
          id:    req.body.user_id,
          email: req.body.lis_person_contact_email_primary,
          name:
          {
            given:  req.body.lis_person_name_given,
            family: req.body.lis_person_name_family,
            full:   req.body.lis_person_name_full,
          },
        },
        context:
        {
          id:    req.body.context_id,
          title: req.body.context_title,
          label: req.body.context_label,
          course_section_id: req.body.lis_course_section_sourcedid,
        },
      };

    // If valid all this handler is responsible for is populating session.ltiData
    // The next handler in the chain should render the index.html with that
    // data included.
    return next();
  }
  catch (err)
  {
    // invalid lti launch request
    let errmsg = 'LTI Verification failed!';
    if (!(err instanceof LoggedError))
      logger.error({ err }, errmsg);
    res.status(400); // Bad Request
    return res.send(errmsg);
  }
}

/* **************************************************************************
 * getLtiProvider                                                      */ /**
 *
 * [Description of getLtiProvider]
 */
function getLtiProvider(oauthConsumerKey, logger)
{
  // Find the matching oauthConsumerSecret
  let lmss = config.has('server.lmss') ? config.get('server.lmss') : [];
  let lms = lmss.find(lms => lms.lti.oauth_consumer_key === oauthConsumerKey);

  if (!lms)
  {
    logger.error({ oauth_consumer_key: oauthConsumerKey,
                   LMSs: lmss.map(lms => lms.name) }, 'No LMS found with given oauth_consumer_key');
    throw new LoggedError(`No LMS found with given oauth_consumer_key: ${oauthConsumerKey}`);
  }

  // Clone the config object so we can add the ltiProvider and store it in the activeLMSs map
  lms = config.util.cloneDeep(lms);

  // Create the ltiProvider
  let client = redis.createClient(config.get('server.lti.redisUrl'));
  store = new lti.Stores.RedisStore('consumer_key', client);
  let ltiProvider = new lti.Provider(lms.lti.oauth_consumer_key, lms.lti.oauth_consumer_secret, store);
  return ltiProvider;
}

/* ******************************************************************************
 * LoggedError                                                             */ /**
 *
 * Throw a LoggedError when details about the error have been logged before throwing.
 * This lets us avoid logging the error multiple times up the chain by checking
 * the instanceof type.
 *
 ********************************************************************************/
class LoggedError extends Error
{
  /* **************************************************************************
   * constructor                                                         */ /**
   *
   * LoggedError class constructor.
   *
   * @param {string} message
   */
  constructor(message)
  {
    super(message);
    this.name = 'LoggedError';
  }
}

// Make sure that all extraneous error paths from the async route handler are dealt with.
const ltiLaunch = expressAsyncHandler(asyncLtiLaunch);

// ES6 import compatible export
//        either: import ltiLaunch from 'ltilaunch';
//            or: import { ltiLaunch } from 'ltilaunch';
//   or CommonJS: const { ltiLaunch } = require('ltilaunch');
module.exports =
{
  default: ltiLaunch,
  ltiLaunch,
};