## Exercise 2

# Modules - Pick - Currying

Create a module named `pick` that exports a function that implements the following behaviour:

```js
var pick = require('./pick');
var pickName = pick('name');

console.log(pickName({name: "Pedro", age: 40})); // => "Pedro"
```
