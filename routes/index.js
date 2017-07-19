var express = require('express');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');


var upload = require("./upload.js");
var newupload = require("./newUpload.js");
var station = require("./station.js");
var traintype = require("./trainType.js");
var train = require("./train.js");

var uploadDest = Multer({
    dest: './uploads'
});



router.get('/api/v1/passport/login',function(req,res){

     res.send("DSADSADASD");
});

router.get('/api/v1/passport/register',function(req,res){
        res.send("DSADSADASD DASDSA");
});

///  Login With Passport JS 




// routes for Upload 

//router.post('/api/v1/uploads', uploadDest.single("file"), upload.parseCSVFile);

router.post('/api/v1/uploads', uploadDest.single("file"), newupload.parseCSVRecords);
router.get('/api/v1/uploads/getAllUpload',newupload.getUpload);
router.get('/api/v1/uploads/processing',newupload.processing);



// routes for train 


router.get('/api/v1/train/getTrains',train.get);

router.get('/api/v1/train/findTrain',train.findByTrainNo);

//Station

router.get('/api/v1/station/getStation',station.get);

/// TrainType
router.get('/api/v1/TrainType/getStation',traintype.get);

module.exports = router;
