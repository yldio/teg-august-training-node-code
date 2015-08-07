var env = require('config.env');
env.load({ log: console.log });

var server = require('./server');

server.start(function(){
  console.log('Server running ', server.info.port);
});
