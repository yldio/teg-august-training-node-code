var Wreck = require('wreck');

var wreck = Wreck.defaults({
  baseUrl: 'http://api.shortener.xyz',
  headers: {
    'content-type': 'application/json'
  },
  json: 'force'
});

module.exports = function(server) {
  server.method('shorteners.create', function(url, callback) {
    wreck.post('/url',
      {
        payload: JSON.stringify({url:url})
      },
      function(err, res, body) {
        if (err) {
          callback(err);
        }
        else if (res.statusCode < 200 || res.statusCode >= 300) {
          callback(new Error('unexpected status code ' + res.statusCode));
        } else {
          callback(null, body);
        }
      });
  });

  server.method('shorteners.get', function(id, callback) {
    wreck.get('/url/' + encodeURIComponent(id),
      function(err, res, body) {
        if (err) {
          callback(err);
        }
        else if (res.statusCode != 302) {
          callback(new Error('unexpected status code ' + res.statusCode));
        } else {
          callback(null, {id: id, url: res.headers.location});
        }
      });
  });
};
