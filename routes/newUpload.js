
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
                saveToDB(data)
            }

            fs.unlink(relativefilePath, function (err) {
                if (err) console.log(err);
                else {
                    console.log("file deleted" + relativefilePath);

                }
            });

        });

    }
};

saveToDB = function (data) {


    var uploadData = {
        data: data,
        fileType: "csv",
        originalFileName: "trainDetails",
        uploadedBy: "santosh",
        status: "true",
        message: "Process not uploaded",
    };

    uploadModel.create(uploadData, function (err, post) {
        if (err) return next(err);
        res.json(post.id);
    });


};






module.exports = uploadObj;