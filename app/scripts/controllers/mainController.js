'use strict';

angular.module('WebChat.controllers', [])
    .controller('mainController', function ($scope) {
        $scope.test = "window";
        $scope.array = [];
        for (var i = 0; i < 50; i++) {
            $scope.array.push({"text": "hello " + i});
        }
    });
