function prop(p) {
  return function(o) {
    if (typeof o == 'object') {
      return o[p];
    }
  };
}

var objects = require('./objects');

console.log(objects.map(prop('age')));