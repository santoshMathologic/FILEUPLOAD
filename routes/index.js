var express = require('express');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');


var upload = require("./upload.js");
var newupload = require("./newUpload.js");


var uploadDest = Multer({
    dest: './uploads'
});





//router.post('/api/v1/uploads', uploadDest.single("file"), upload.parseCSVFile);

router.post('/api/v1/uploads', uploadDest.single("file"), newupload.parseCSVRecords);




module.exports = router;
