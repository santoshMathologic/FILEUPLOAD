var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var options = {
  db: { native_parser: true },
  server: { poolSize: 200 },
  replset: { rs_name: '' },
  user: '',
  pass: ''
};

mongoose.connect('mongodb://127.0.0.1/bt',options, function(error) {
    if (error) {
        console.log('Cant connect to db', error);
    } else {
      console.log('Connection Successfully');
   }
});
