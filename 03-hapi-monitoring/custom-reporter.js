var Squeeze = require('good-squeeze').Squeeze;

module.exports = CustomReporter;

function CustomReporter(events, config) {
  this._filter = new Squeeze(events);
};

CustomReporter.prototype.init = function (stream, emitter, callback) {
  stream.pipe(this._filter).on('data', function(event) {
    console.log(JSON.stringify(event));
  });

  callback();
};