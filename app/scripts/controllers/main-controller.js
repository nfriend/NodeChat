'use strict';

angular.module('nodeChat.controllers').
    controller('mainController', ['$scope', function ($scope) {
        var isMyMessage = true;

        $scope.messages = [];
        $scope.chatInput = '';

        var colors = ['blue', 'green', 'red', 'light-blue', 'orange', 'gray'];

        for (var i = 0; i < 5; i++) {
            $scope.messages.push({
                'name': 'Nathan ' + i,
                'message': 'hello ' + i,
                'isMyMessage': isMyMessage,
                'color': colors[i % 6]
            });

            isMyMessage = i % 3 === 0;
        }

        $scope.send = function () {
            $scope.messages.push({
                'name': 'Nathan',
                'message': $scope.chatInput,
                'isMyMessage': isMyMessage,
                'color': colors[2]
            });

            isMyMessage = !isMyMessage;

            $scope.chatInput = '';
            $scope.scrollToBottom();
        };

        $scope.chatInputKeyDown = function (event) {
            // if shift + enter is pressed
            if (event.shiftKey && event.which === 13) {
                $scope.send();
                event.stopPropagation();
                event.preventDefault();
            }
        };
    }]);