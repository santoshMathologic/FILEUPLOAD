
var express = require('express');
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');
var json2csv = require('json2csv');
var Promise = require("bluebird");
var async = require('async');
var uploadModel = require('../models/upload.js');
var trainModel = require('../models/train.js');
var station = require('../models/station.js');


var traindata = [];

var uploadObj = {

    parseCSVRecords: function (req, res, next) {
        var relativefilePath = req.file.path;

        fs.readFile(relativefilePath, "utf8", function (err, data) {
            if (err) throw err;
            else {
                saveToDB(data).then(function success(res) {
                });
            }
            fs.unlink(relativefilePath, function (err) {
                if (err) console.log(err);
                else {
                    console.log("file deleted" + relativefilePath);

                }
            });

        });

        res.status(200);
        res.json({
            "success": true,
            "status": 200,
            "message": "File has been Upload successfully into DB !!!!!"
        });


    },

    getUpload: function (req, res) {
        var choice = req.query.type || "";
        switch (choice) {
            case "td":

                var options = {
                    perPage: parseInt(req.query.limit) || 10,
                    page: parseInt(req.query.page) || 1,
                };
                var query = uploadModel.find({ "uploadFileType": choice }, { "uploadFileType": 1, "fileType": 1, "message": 1, "_id": 0, "status": 1 });
                query.paginate(options, function (err, result) {
                    if (err) throw err;
                    res.json(result);
                });


                break;

            case "tm":
                var options1 = {
                    perPage: parseInt(req.query.limit) || 10,
                    page: parseInt(req.query.page) || 1,
                };
                var query1 = uploadModel.find({ "uploadFileType": choice }, { "uploadFileType": 1, "fileType": 1, "message": 1, "_id": 0, "status": 1 });
                query1.paginate(options1, function (err, result) {
                    if (err) throw err;
                    res.json(result);
                });
                break;


        }
    },

    processTrainDetails: function (req, res) {

        var ch = req.query.type || "";
        switch (ch) {

            case "td":
            case "TD":
                uploadModel.find({ "uploadFileType": ch }, { "data": 1 }, function (err, result) {
                    processTrainDetailsRecordData(result[0]._doc.data);
                });
                break;


            case "tm":
            case "TM":
                break;

        }


    }



};


processTrainDetailsRecordData = function (resultdata) {

    var deferred = q.defer();

    var trainNo = 0;
    var trainName = "";
    var trainType = "";
    var fromStation = "";
    var toStation = "";
    var arrival = "";
    var departure = "";



    if (resultdata !== null || resultdata !== 'undefined') {
        var rExp = new RegExp(/\r\n|\n\r|\n|\r/g); // tabs or carriage return character
        // var rows = resultdata.replace(re, "\n").split("\n");
        var r = resultdata.replace(rExp, "\n");
        var rows = r.split("\n");

        for (var i = 1; i < rows.length; i++) {
            var cols = rows[0].split(",");
            var data = rows[i].split(',');
            if (data != "") {
                trainNo = parseInt(data[0]);
                trainName = data[1];
                trainType = data[2];
                fromStation = data[3];
                arrival = data[4];
                toStation = data[5];
                departure = data[6];


                var t = {
                    "trainNo": trainNo,
                    "trainName": trainName,
                    "trainType": trainType,
                    "fromStation": fromStation,
                    "toStation": toStation,
                    "arrival": arrival,
                    "departure": departure,
                    "startDay": []
                };

                for (var j = 0; j < 7; j++) {
                    var rdays = data[7 + j].split(",");
                    if (rdays != "") {
                        t.startDay.push(j);
                    }

                }

                traindata.push(t);

            }
        }


        var trainObj = {};

        traindata.forEach(function (item) {
            for (var k = 0; k < item.startDay.length; k++) {
                trainObj.trainNo = item.trainNo;
                trainObj.trainName = item.trainName;
                trainObj.trainType = item.trainType;
                trainObj.fromStation = item.fromStation;
                trainObj.toStation = item.toStation;
                trainObj.arrival = item.arrival;
                trainObj.departure = item.departure;
                trainObj.runningDay = item.startDay[k];

                Promise.all([findFrom(trainObj.fromStation), findTo(trainObj.toStation)])
                    .then(function (allData) {
                        console.log(allData[0][0]);
                        var fromId = allData[0][0]._id;
                        var toId = allData[1][0]._id;
                        // saveTrainToDB("singleSave", trainObj);
                        trainObj.fromStationId = fromId;
                        trainObj.toStationId = toId;
                        saveTrainToDB("singleSave", trainObj);

                    });

                
            }


        });



        //deferred.resolve(traindata);

    }
    //return deferred.promise;
};


findFrom = function (from) {
    return new Promise(function (resolve, reject) {
        station.find({ 'code': { '$regex': from } }, function (err, res) {
            return resolve(res);
        });
    });

};

findTo = function (to) {
    return new Promise(function (resolve, reject) {
        station.find({ 'code': { '$regex': to } }, function (err, res) {
            return resolve(res);
        });
    });

}

/*
async.parallel({

    findFrom: function (from) {

        station.find({ 'code': { '$regex': from } }, function (err, res) {
            return resolve(res);
        });
    },

    findTo: function (to) {

        station.find({ 'code': { '$regex': to } }, function (err, res) {

        });

    }

}, function (err, results) {
    // results will have the results of all 3
    console.log(results.one);
    console.log(results.two);

});
*/

saveTrainToDB = function (ch, trainObj) {


    switch (ch) {
        case "singleSave":
        case "SINGLESAVE":

            trainModel.create(trainObj, function (err, result) {
                if (err) return err;
                else {
                    //res.json(result);
                    console.log("Train saved Successfully !!!!!!!!");
                }
            });
            break;

        case "bulkSave":
        case "BULKSAVE":
            var deferred = q.defer();
            trainModel.insertMany(traindata, function (error, result) {
                if (error) return error;
                console.log("Train saved Successfully");
                deferred.resolve(result);

            });
            break;


    }




    //return deferred.promise;
};
saveToDB = function (data) {

    var deferred = q.defer();
    var uploadData = {
        data: data,
        fileType: "csv",
        originalFileName: "trainDetails",
        uploadedBy: "santosh",
        status: "true",
        message: "Process not uploaded",
    };

    uploadModel.create(uploadData, function (err, post) {
        if (err) throw err;
        deferred.resolve("Upload Successfully");
    });

    return deferred.promise;

};






module.exports = uploadObj;