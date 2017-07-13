
' use strict';

var app = angular.module("BTAPP", ['ngFileUpload']);

app.controller("uploadCtrl", function ($scope, $location, Upload) {

   

    $scope.Upload = function () {
        if ($scope.uploadForm.file.$valid && $scope.file) {
            Upload.upload({
                url: '/api/v1/uploads',
                data: { file: $scope.file }
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);
            });




        }

    };


});