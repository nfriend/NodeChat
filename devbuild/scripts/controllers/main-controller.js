'use strict';

angular.module('nodeChat.controllers').
    controller('mainController', ['$scope', 'websocketConnection', function ($scope, websocketConnection) {
        var colors = ['blue', 'green', 'red', 'light-blue', 'orange', 'gray'];
        var whoosh = new Audio('audio/whoosh-mid.mp3');
        $scope.messages = [];
        $scope.chatInput = '';
        
        websocketConnection.on('connect', function () {
            console.log('connected!!');
        });

        websocketConnection.on('error', function () {
            console.log('uh oh. error\'d.');
        });

        websocketConnection.on('recieve', function (data) {
            data.isMyMessage = false;
            data.color = colors[1];
            $scope.messages.push(data);
            whoosh.play();
            $scope.scrollToBottom();
        });

        websocketConnection.on('disconnect', function () {
            console.log('disconnected!!');
        });

        websocketConnection.connect();

        for (var i = 0; i < 5; i++) {
            $scope.messages.push({
                'name': 'Nathan ' + i,
                'message': 'hello ' + i,
                'isMyMessage': i % 3 === 0,
                'color': colors[i % 6]
            });
        }

        $scope.send = function () {
            var newMessage = {
                'name': 'Me',
                'message': $scope.chatInput,
                'isMyMessage': true,
                'color': 'gray'
            };

            $scope.messages.push(newMessage);
            websocketConnection.send(newMessage);

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