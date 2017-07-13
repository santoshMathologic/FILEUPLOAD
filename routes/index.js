var express = require('express');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');


var upload = require("./upload.js");

var uploadDest = Multer({
    dest: './uploads'
});

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});



router.post('/api/v1/uploads', uploadDest.single("file"), upload.parseUpload);




module.exports = router;
