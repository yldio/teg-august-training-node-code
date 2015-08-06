var post = require('./post');

post({a:1, b:2}, function(err, res) {
  if (err) {
    console.log('response error: ', err);
  }
  else {
    console.log('response:', res);
  }
})