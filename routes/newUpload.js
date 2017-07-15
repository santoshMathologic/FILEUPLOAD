
var express = require('express');
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');
var json2csv = require('json2csv');
var uploadModel = require('../models/upload.js');




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

    getUpload: function (req, res, next) {
        var choice = req.query.type || "";
        switch (choice) {
            case "td":

                var options = {
                       perPage: parseInt(req.query.limit) || 10,
                       page: parseInt(req.query.page) || 1,
                };
                var query = uploadModel.find({});
                query.paginate(options, function (err, result) {
                    console.log(result); 

                    if(err) throw err;
                     return res.json(resresult);
                });


                break;

            case "tm":
                break;


        }



    }


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