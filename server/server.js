const path = require('path');

const config = require('config');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const session = require('express-session')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const hoganXpress = require('hogan-xpress'); // mustache templating engine
const reqLogger = require('morgan');

const rtcServerVer = require('../package.json').version;
const { loggerInstance: logger } = require('./utils/logger');
const { spaRouter } = require('./routes/router_spa');
const { ltiRouter } = require('./routes/router_apilti');

require('dotenv').config();

// Log the current config settings
const serverConfig = config.get('server');
const clientConfig = { rtcServerVer, ...(config.get('client')) };
logger.debug({ serverConfig, clientConfig });

app.engine('html', hoganXpress);
app.set('view engine', 'html');

app.set('appLogger', logger);
app.set('routerLogger', logger.child({ router: 'APP' })); // will be overwritten by router's middleware
app.use(reqLogger('dev'));
app.use(cookieParser());
app.enable("trust proxy");

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the session middleware
app.use(session({ secret: config.get('server.sessionSecret'),
                  cookie: { maxAge: 60000 },
                  resave: false,
                  saveUninitialized: false,
                }));
app.use(serveStatic(path.join(__dirname, '../build'), { index: false, redirect: false }));

// Named base routes
if (config.get('server.lti.enabled'))
  app.use('/api/lti', ltiRouter);

// These routes shouldn't be getting to this server, the reverse proxy should have
// redirected them to the servers that handle them, so we'll just respond w/ a 404.
app.use('/api/videodata', misdirected);
app.use('/api/signalmaster', misdirected);
app.use('/api', misdirected);

// All routes not handled above should return the SPA
app.use('/', spaRouter);


// Start listening for requests
const port = config.get('server.port') || 5000;
server.listen(port);

logger.info({port}, 'Listening!');

/* **************************************************************************
 * misdirected                                                         */ /**
 *
 * Express route handler that sets the status to 404 and returns file not
 * found.
 * This is used for routes that should never reach this server, e.g.
 * the websocket routes the reverse proxy is suppose to send to the servers
 * that handle them.
 */
function misdirected(req, res)
{
  logger.debug({ req, reqUrl: req.url, reqOrigUrl: req.originalUrl }, 'misdirected');
  res.status(404);
  res.send('404: File Not Found');
}
