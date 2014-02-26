'use strict';

angular.module('NodeChat.controllers', [])
    .controller('mainController', function ($scope) {
        var isMyMessage = true;
        
        $scope.test = "window";
        $scope.array = [];
        $scope.chatInput = "";

        for (var i = 0; i < 50; i++) {
            $scope.array.push({
                "name": "Nathan " + i,
                "message": "hello " + i,
                "isMyMessage": isMyMessage
            });

            isMyMessage = i % 3 === 0;
        }

        $scope.send = function () {
            $scope.array.push({
                "name": "Nathan",
                "message": $scope.chatInput,
                "isMyMessage" : isMyMessage
            });

            isMyMessage = !isMyMessage;

            $scope.chatInput = "";
            $scope.scrollToBottom();
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
