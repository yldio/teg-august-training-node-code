var fs = require('fs');

function saveFile(name, text, cb) {
  if (name && text) {
    fs.writeFile(name, text, cb);
  }
}

function saveAll(files, cb) {
  var fileNames = Object.keys(files);
  var pending = fileNames.length;

  fileNames.forEach(function(fileName) {
    saveFile(fileName, files[fileName], function(err) {
      if (err) {
        cb(err);
      }
      else {
        if (-- pending == 0) {
          cb();
        }
      }
    });
  });
}


var files = {
  'a.txt': 'text for A',
  'b.txt': 'text for B',
  'c.txt': 'text for C',
  'd.txt': null
};


saveAll(files, function(err) {
  if (err) {
    throw err;
  }
  else {
    console.log('all files saved');
  }
});

