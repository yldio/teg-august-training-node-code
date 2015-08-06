var server = require('http').createServer(handleRequest);

server.listen(3456, function() {
  console.log('server listening on %j', server.address());
});

function handleRequest(req, res) {
  if (req.method != 'POST')
    return replyError('only accepts POST');

  if (req.url != '/path')
    return replyError('only accepts POST to /path');

  var type = req.headers['content-type'];
  if (! type)
    return replyError('need content-type header');

  if (type.indexOf('application/json') != 0)
    return replyError('content-type must be application/json');

  var body = '';

  req.setEncoding('utf8');

  req.on('data', function(d) {
    body += d;
  });

  req.once('end', function() {
    try {
      body = JSON.parse(body);
    } catch(err) {
      return replyError(err.message);
    }

    res.end(JSON.stringify({ok: true, body: body}));
  });

  function replyError(err) {
    res.statusCode = 400;
    res.end(err);
  }
}