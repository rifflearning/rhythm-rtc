/* ******************************************************************************
 * errortypes.js                                                                *
 * *************************************************************************/ /**
 *
 * @fileoverview Application specific Error types (classes) derived from Error
 *
 * [More detail about the file's contents]
 *
 * Created on       October 1, 2018
 * @author          Michael Jay Lippert
 *
 * @copyright (c) 2018 Riff Learning,
 *            MIT License (see https://opensource.org/licenses/MIT)
 *
 * ******************************************************************************/

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

//
// ES6 import compatible export
//    NO default: import errorTypes from 'errortypes'; // intentionally not supported
//    use either: import { LoggedError } from 'errortypes';
//   or CommonJS: const { LoggedError } = require('errortypes');
module.exports =
{
  LoggedError,
};
