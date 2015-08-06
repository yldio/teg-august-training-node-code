var Hapi = require('hapi');
var joi = require('joi');
var Good = require('good');

var server = module.exports = new Hapi.Server();

require('./methods')(server);

server.connection({
  host: process.env.SERVER_BIND || 'localhost',
  port: process.env.SERVER_PORT || 4000
});

var events =  {
  error: '*',
  wreck: '*',
  response: '*',
  log: '*',
  request: '*'
};

if (process.env.NODE_ENV === 'test')
  events = {};

var goodOpts = {
  reporters: [{
    reporter: require('good-console'),
    events: events
  }]
};

server.register([{register: Good, options: goodOpts }] , function(err) {
  if (err)
    throw err;

  require('./routes');
});

