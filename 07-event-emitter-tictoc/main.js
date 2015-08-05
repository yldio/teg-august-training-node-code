var clock = require('./clock');

clock.on('tic', function(time) {
  console.log('tic', time);
});

clock.on('toc', function(time) {
  console.log('tic', time);
});