var http = require('http');

var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});