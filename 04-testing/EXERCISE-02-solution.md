# Testing

## Exercise 02 - Integration tests - Solution

One solution:

**test/add.post.js:**

```js
var expect = require('chai').expect;
var server = require('../server');

describe('POST /add', function(done) {

  it('should return 400 when no body', function(done) {
    server.inject(
      {
        method: 'POST',
        url: '/add',
        payload: undefined
      },
      function(res) {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return 400 when URL is invalid', function(done) {
    server.inject(
      {
        method: 'POST',
        url: '/add',
        payload: {url: 'abcdef'}
      },
      function(res) {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return a shortened url for a valid URL', function(done) {
    server.inject(
      {
        method: 'POST',
        url: '/add',
        payload: {url: 'http://google.com' }
      },
      function(res) {
        expect(res.statusCode).to.equal(200);
        expect(res.headers['content-type']).to.include('application/json');
        expect(res.result.shortened).to.be.a('string');
        expect(res.result.url).to.equal('http://google.com');
        done();
      });
  });

});
```