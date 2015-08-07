function squareService(n, cb) {
  setTimeout(function() {
    cb(null, n * n);
  }, Math.floor(Math.random() * 500));
}

var numbers = [1,2,3,4,5];
var results = [];

numbers.forEach(function(n) {
  squareService(n, function(err, result) {
    if (err) {
      throw err;
    }

    results.push(result);
    if (results.length == numbers.length) {
      console.log('all done. results: %j', results);
    }
  });
});