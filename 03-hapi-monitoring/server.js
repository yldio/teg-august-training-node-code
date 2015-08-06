var Hapi = require('hapi');
var joi = require('joi');

var server = module.exports = new Hapi.Server();

require('./methods')(server);

server.connection({
  host: process.env.SERVER_BIND || 'localhost',
  port: process.env.SERVER_PORT || 4000
});

var events =  {
  'request':  '*',
  'response': '*',
  'error':    '*'
};

if (process.env.NODE_ENV === 'test')
  events = {};

var goodOptions = {
  opsInterval: 1000,
  reporters: [
    {
      reporter: require('./custom-reporter'),
      events: events
    }
  ]
};

server.register([{ register: require('good'), options: goodOptions}], function(err) {
  if (err) throw err;

  require('./routes');
});
