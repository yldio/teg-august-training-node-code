var Hapi = require('hapi');
var joi = require('joi');

var server = module.exports = new Hapi.Server();

require('./methods')(server);

server.connection({
  host: process.env.SERVER_BIND || 'localhost',
  port: process.env.SERVER_PORT || 4000
});

require('./routes');