## Exercise 4

# Callbacks - Capitalize file


* Create a module named `capitalize-file` that exports a function
* this function accepts two arguments: a file name and a callback. When called, this function:
  * reads the file contents (UTF-8-encoded)
  * transforms contents into uppercase
  * calls back

Usage:

**main.js:**

```js
var capitalizeFile = require('./capitalize-file');

capitalizeFile(__filename, function(err, contents) {
  if (err) {
    throw err;
  }
  console.log(contents);
});
```

## Resources

* Node internal documentation of the `fs`  module: [https://nodejs.org/api/fs.html](https://nodejs.org/api/fs.html)

