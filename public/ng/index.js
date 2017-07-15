
' use strict';

var app = angular.module("BTAPP", ['ngFileUpload']);

app.controller("uploadCtrl", function ($scope, $location, Upload) {

    $scope.progressPercentage = 0;

    $scope.Upload = function () {
        if ($scope.uploadForm.file.$valid && $scope.file) {
            Upload.upload({
                url: '/api/v1/uploads',
                data: { file: $scope.file }
            }).then(function successResponse(successResp) {
                console.log(successResp);
                $scope.addToTrainDetailsTable($scope.file);
            }, function errorResponse(errorResp) {
                console.log(errorResp);
            }, function (evt) {
                $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progress = Math.round(evt.loaded * 100 / evt.total);
                console.log("" + $scope.progressPercentage);
                //console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);
            });




        }

    };

    $scope.addToTrainDetailsTable = function (file) {

        console.log(file);

        $scope.trainDetailsList = [{
            fileName: file.name,
            size:file.size,
            status: "successfully Uploaded",
            fileExtension: "csv",
            uploader: "David",
            uploadDate: new Date()
        }];

    };

});