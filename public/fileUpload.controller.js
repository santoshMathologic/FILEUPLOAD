
' use strict';

var app = angular.module("BTAPP", ['ngFileUpload']);

app.controller("uploadCtrl", function ($scope, $location, Upload) {

    console.log("Upload Controller");


    $scope.Upload = function () {
        if ($scope.uploadForm.file.$valid && $scope.file) {

            console.log("DASDASD");

        }

    }


});