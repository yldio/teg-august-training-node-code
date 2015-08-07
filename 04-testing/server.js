var Hapi = require('hapi');
var db = require('kurto-db');
var joi = require('joi');
var swagger = require('hapi-swagger');
var Good = require('good');

var server = new Hapi.Server();

server.connection({
  host: process.env.SERVER_BIND || 'localhost',
  port: process.env.SERVER_PORT || 4000
});

server.db = db;

var events =  { error: '*', wreck: '*', response: '*', log: '*', request: '*' };
if (process.env.NODE_ENV === 'test')
  events = {};

var goodOpts = {
  reporters: [{
    reporter: require('good-console'),
    events: events
  }]
};

server.register([{ register: swagger }, {register: Good, options: goodOpts }] , function(err) {
  if (err)
    throw err;

  server.route({
    method: 'POST',
    path: '/add',
    config: {
      tags: ['api'],
      payload: { allow: 'application/json' },
      validate: {
        payload: joi.object({
          url: joi.string().uri().required()
        })
      }
    },
    handler: function(request, reply) {
      var payload = request.payload;
      db.add(payload.url, saved);

      function saved(err, id) {
        if (err)
          return reply(err);

        reply({ shortened: id, url: payload.url });
      }
    }
  });


  server.route({
    method: 'GET',
    path: '/lookup/{id}',
    handler: function(request, reply) {
      var id = request.params.id;
      db.lookup(id, fetched);

      function fetched(err, shortened) {
        if (err)
          return reply(err);

        if (!shortened)
          return reply().code(404);

        reply({ url: shortened });
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

});


module.exports = server;
