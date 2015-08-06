var pick = require('./pick');
var pickName = pick('name');

console.log(pickName({name: "Pedro", age: 40})); // => "Pedro"
