var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1/bt', function(error) {
    if (error) {
        console.log('Cant connect to db', error);
    } else {
      console.log('Connection Successfully');
   }
});
