
var express = require('express');
var mongoose = require('mongoose');

require('mongoose-query-paginate');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');
var json2csv = require('json2csv');



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
                uploadToServer(record);
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


    console.log(records);

};


uploadToServer = function (records) {

    var headerfields = ['islno', 'Train_No', 'station_Code', 'Day_ of_ Journey', 'Arrival_time', 'Departure_time', 'Distance'];

    var csv = json2csv({ data: records, fields: headerfields });

    fs.writeFile('file.csv', csv, function (err) {
        if (err) throw err;
        console.log('file saved');
    });


}




module.exports = uploadObj;