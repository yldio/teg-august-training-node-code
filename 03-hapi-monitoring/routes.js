var joi = require('joi');
var server = require('./server');

server.route({
  method: 'POST',
  path: '/add',
  config: {
    tags: ['api'],
    payload: { allow: 'application/json' },
    validate: {
      payload: joi.object({
        url: joi.string().required()
      })
    }
  },
  handler: function(request, reply) {
    request.log('saving url', request.payload.url);
    request.server.methods.shorteners.create(request.payload.url, saved);

    function saved(err, res) {
      if (err)
        return reply(err);

      request.log('saved url', {url: request.payload.url, res: res});
      reply(res);
    }
  }
});


server.route({
  method: 'GET',
  path: '/lookup/{id}',
  handler: function(request, reply) {
    doesnotexist();
    request.server.methods.shorteners.get(request.params.id, fetched);

    function fetched(err, result) {
      if (err)
        return reply(err);

      if (!result)
        return reply().code(404);

      reply(result);
    }
  },
  config: {
    tags: ['api'],
    validate: {
      params: {
        id: joi.any().required()
      }
    }
  }
});


server.route({
  method: 'GET',
  path: '/latest',
  handler: function(request, reply) {
    var limit = request.query.limit;
    db.recent(limit, latest);

    function latest(err, urls) {
      if (err)
        return reply(err);

      reply(urls);
    }
  },
  config: {
    tags: ['api'],
    validate: {
      query: {
        limit: joi.number().integer().min(0).max(30).default(10)
      }
    }
  }
});