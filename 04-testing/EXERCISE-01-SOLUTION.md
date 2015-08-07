## Testing

# Exercise 01 - Solution

One possible solution to [exercise 01](EXERCISE-01.md):

**lib/square.js:**

```js
module.exports = function(n) {
  return n * n;
};
```


**test/square.js:**

```js
var expect = require('chai').expect;
var square = require('../lib/square');

var expected = {
  0:  0,
  1:  1,
  2:  4,
  3:  9
}

describe('square', function() {

  Object.keys(expected).forEach(function(n) {
    it('should return ' + expected[n] + ' when the value is ' + n, function() {
      expect(square(n)).to.equal(expected[n]);
    });
  });

});
```