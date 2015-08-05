var capitalizeFile = require('./capitalize-file');

capitalizeFile(__filename, function(err, contents) {
  if (err) {
    throw err;
  }
  console.log(contents);
});