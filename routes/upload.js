
var express = require('express');
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');
var json2csv = require('json2csv');

var trainData = [];


var uploadObj = {

    parseCSVFile: function (req, res, next) {
        var relativefilePath = req.file.path;

        fs.readFile(relativefilePath, "utf8", function (err, data) {
            if (err) throw err;
            else {
                parseRecords(data);
            }

            fs.unlink(file, function (err) {
                if (err) console.log(err);
                else {
                    console.log("file deleted" + file);

                }
            });

        });

    }
};

parseRecords = function (data) {

    data += '\n';
    var re = /\r\n|\n\r|\n|\r/g;
    var rows = data.replace(re, "\n").split("\n");

    for (var i = 1; i < rows.length; i++) {
        var rowdata = rows[i].split(",");
        var slNo = rowdata[1];
        var trainNo = rowdata[0];
        var stationCode = rowdata[2];
        var dayOfJourney = rowdata[3];
        var arrivalTime = rowdata[4];
        var departureTime = rowdata[5];
        var distance = rowdata[6];
        pushDateToArray(slNo, trainNo, stationCode, dayOfJourney, arrivalTime, departureTime, distance);
    }

    //uploadToServer();

};


uploadToServer = function () {

    var headerfields = ['islno', 'trainNo', 'stationCode', 'dayofJourney', 'arrivalTime', 'departureTime', 'distance'];
    console.log(trainData);
    var csv = json2csv({ data: trainData, fields: headerfields });

    fs.writeFile('file.csv', csv, function (err) {
        if (err) throw err;
        console.log('file saved');
    });

};

pushDateToArray = function (islno, Train_No, stationCode, dayofJourney, arrivaltime, departuretime, distance) {
    trainData.push({
        islno: islno,
        trainNo: Train_No,
        stationCode: stationCode,
        dayofJourney: dayofJourney,
        arrivalTime: arrivaltime,
        departureTime: departuretime,
        distance: distance,
    });

};


module.exports = uploadObj;