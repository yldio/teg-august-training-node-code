var server = require('./server');

server.start(function(){
  console.log('Server running ', server.info.port);
});
