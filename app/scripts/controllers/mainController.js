'use strict';

angular.module('NodeChat.controllers', [])
    .controller('mainController', function ($scope) {
        $scope.test = "window";
        $scope.array = [];
        $scope.chatInput = "";

        for (var i = 0; i < 50; i++) {
            $scope.array.push({"text": "hello " + i});
        }

        $scope.send = function () {
            console.log("sdfsd");
            $scope.array.push({ "text": $scope.chatInput });
            $scope.chatInput = "";
        }

        $scope.chatInputKeyDown = function (event) {
            // if shift + enter is pressed
            if (event.shiftKey && event.which === 13) {
                $scope.send();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    });
