
' use strict';

var app = angular.module("BTAPP", ['ngFileUpload']);

app.controller("uploadCtrl", function ($scope, $location, Upload) {

    $scope.progressPercentage = 0;
    $scope.startUploadStyle = {
        "color": "white",
        "background-color": "rgb(66, 184, 221)",
        "font-size": "15px",
        "border": "1px solid white",
        "text-shadow": "0 1px 1px rgba(0, 0, 0, 0.2)",
        "padding": "7px 8px 11px 6px",
        "width": "140px",
        "height": "37px"
    };

    $scope.cancelUploadStyle = {
        "color": "white",
        "background-color": "#a94442",
        "font-size": "15px",
        "border": "1px solid white",
        "text-shadow": "0 1px 1px rgba(0, 0, 0, 0.2)",
        "padding": "7px 8px 11px 6px",
        "width": "140px",
        "height": "37px"
    };

    $scope.browseStyle = {
        "color": "white",
        "font-size": "15px",
        "border": "1px solid white",
        "text-shadow": "0 1px 1px rgba(0, 0, 0, 0.2)",
        "padding": "7px 8px 11px 6px",
        "width": "104px",
        "height": "37px",
        "background-color": "#42a744",
        "border-color": "#4cae4c",
    };


    $scope.uploaddetails = [{
        "filename": "traindetails",
        "extenstion": "csv",
        "uploader": "santosh",
        "size": "13352",
        "uploaddate": "15 SAT JULY 2017 12:33:00",
        "types": "./images/csv.png"
    },
    {
        "filename": "traindetails",
        "extenstion": "csv",
        "uploader": "santosh",
        "size": "13352",
        "uploaddate": "15 SAT JULY 2017 12:33:00",
        "types": "./images/csv.png"
    }, {
        "filename": "traindetails",
        "extenstion": "csv",
        "uploader": "santosh",
        "size": "13352",
        "uploaddate": "15 SAT JULY 2017 12:33:00",
        "types": "./images/csv.png"
    }, {
        "filename": "traindetails",
        "extenstion": "csv",
        "uploader": "santosh",
        "size": "13352",
        "uploaddate": "15 SAT JULY 2017 12:33:00",
        "types": "./images/csv.png"
    }



    ];

    $scope.submit = function (ch) {
        if ($scope.trainDetailForm.file.$valid && $scope.traindetails) {


            switch (ch) {
                case "trainDetails":

                    $scope.trainDetailsUpload($scope.traindetails);
                    break;
                case "trainTimeTable":

                    break;
                default:
                    break;
            }



        }
    };


    $scope.trainDetailsUpload = function (file) {

        Upload.upload({
            url: '/api/v1/uploads',
            data: { file: file }
        }).then(function successResponse(successResp) {
            console.log(successResp);
            $scope.addToTrainDetailsTable(file);
        }, function errorResponse(errorResp) {
            console.log(errorResp);
        }, function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progress = Math.round(evt.loaded * 100 / evt.total);
            console.log("" + $scope.progressPercentage);
            //console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);
        });

    };

    $scope.addToTrainDetailsTable = function (file) {

        console.log(file);

        $scope.trainDetailsList = [{
            fileName: file.name,
            size: file.size,
            status: "successfully Uploaded",
            fileExtension: "csv",
            uploader: "David",
            uploadDate: new Date()
        }];

    };

});