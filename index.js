var influx = require('influx');
var Promise = require('bluebird');
var winston = require('winston');
var request = Promise.promisifyAll(require('request'));

var dbName = process.env.APP_DB_NAME || 'home';
var dbConnectionURL = (process.env.APP_DB_URL || 'http://localhost:8086/') + dbName;
var dbClient = influx(dbConnectionURL);
var dbTags = process.env.APP_DB_TAGS ? JSON.parse(process.env.APP_DB_TAGS) : null;
var dataUrl = process.env.APP_DATA_URL;
var timeout = process.env.APP_TIMEOUT;
var env = process.env.NODE_ENV || 'dev';
var dev = env == 'dev';

var logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      timestamp: () => '[' + new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }) + ']',
      level: 'info',
      label: 'motorola-camera',
      name: 'console',
      formatter: (options) => options.timestamp() + ' ' +
        options.label + '.' + options.level.toUpperCase() + ': ' +
        (options.message !== undefined ? options.message : '') +
        (options.meta && Object.keys(options.meta).length ? '\n\t' +
        JSON.stringify(options.meta) : ''),
    }),
  ],
});

if (!dataUrl) {
  throw new Error(`Not set env variable APP_DATA_URL. Unknown where to grab data`);
}

logger.info(`dbName: ${dbName}`);
logger.info(`dbConnectionURL: ${dbConnectionURL.replace(/\/\w+:.*?@/, '/*:*@')}`);
logger.info(`dbTags: ${JSON.stringify(dbTags)}`);
logger.info(`env: ${env}`);
logger.info(`dev: ${dev}`);
if (dev) {
  Promise.config({
    warnings: true,
    monitoring: true
  });
}

function init() {
  dbClient.getDatabaseNames(function(err, arrayDatabaseNames){
    if (err) {
      logger.error(err.message);
      throw err;
    }
    if (arrayDatabaseNames.indexOf(dbName) === -1) {
      client.createDatabase(dbName, function(err, result) {
        if (err) {
          logger.error(err.message);
          throw err;
        }
        logger.info(result);
        serve();
      } )
    } else {
      serve();
    }
  })
}

function serve()
{
  logTemperature({url: dataUrl, tags: dbTags});
  Promise.delay(timeout).then(serve);
}

function logTemperature({url, tags = null})
{
  getTemperatureValue(url)
    .then((value) => {
      writeTemperature({
        value,
        tags,
      });
    })
    .catch((err) => {
      logger.error(err.message);
    });
}

function getTemperatureValue(url)
{
  return request.getAsync(url)
  // return Promise.resolve({body:'value_temperature: 24.0'})
    .then((response) => {
        // value_temperature: 24.0
        let body = response.body;
        if (!body || body.length == 0) {
          throw new Error(`Empty body response`);
        }
        let temperature = parseFloat(body.match(/(\d+\.?\d*)/)[1]);
        if (!temperature) {
          throw new Error(`Bad responce body "${body}"`);
        }
        if (dev) logger.info(`Get temperature ${temperature}`);
        return temperature;
    });
}

function writeTemperature({value, tags = null})
{
  return new Promise((resolve, reject) => {
    if (!value) {
      throw new Error(`Bad temperature value "${value}"`);
    }

    dbClient.writePoint(
      'weather',
      {time: new Date(), temperature: value},
      tags,
      (err, response) => {
        if (err) return reject(err);
        resolve(response);
      }
    )
  });
}

init();
