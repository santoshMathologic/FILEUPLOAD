
var express = require('express');
var mongoose = require('mongoose');

require('mongoose-query-paginate');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');




var trainDetails = [];


var uploadObj = {

    parseUpload: function (req, res, next) {
        var filePath = req.file.path;

        var columns = true;
        var source = fs.createReadStream(filePath);

        var parser = Parse({
            delimiter: ',',
            columns: columns
        });

        parser.on("readable", function () {
            var record;
            while (record = parser.read()) {
                
                parseRecords(record);
            }
        });

        parser.on("error", function (error) {
            console.log(error);
        });

        parser.on("end", function () {
            fs.unlinkSync(filePath);
            console.log("End");
        });

        source.pipe(parser);

    }
};

parseRecords = function (records) {

 
    trainDetails = [];
        var trainNo = records.Train_No;
        var trainName = records.train_Name;
        var from = records.Source;
        var to = records.Destination;
        var trainType = records.Train_Type;
        
};




module.exports = uploadObj;