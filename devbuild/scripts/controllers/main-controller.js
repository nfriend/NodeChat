'use strict';

angular.module('nodeChat.controllers').
    controller('mainController', ['$scope', '$modal', 'websocketConnection', 'colors', 'userInformation', function ($scope, $modal, websocketConnection, colors, userInformation) {
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
            if (data.type === 'new') {
                data.isMyMessage = false;
                $scope.messages.push(data);
                whoosh.play();
            } else if (data.type === 'history') {
                data.messages.forEach(function (element, index, array) {
                    var message = JSON.parse(element);
                    message.isMyMessage = false;
                    $scope.messages.push(message);
                });
            }

            $scope.scrollToBottom();
        });

        websocketConnection.on('disconnect', function () {
            console.log('disconnected!!');
        });

        websocketConnection.connect();

        $scope.send = function () {
            var newMessage = {
                'type': 'new',
                'name': userInformation.name,
                'message': $scope.chatInput,
                'isMyMessage': true,
                'color': userInformation.color
            };

            console.log($scope.chatInput);

            $scope.messages.push(newMessage);
            websocketConnection.send(newMessage);

            $scope.chatInput = '';
            $scope.scrollToBottom();
        };

        $scope.chatInputKeyDown = function (event) {
            if (event.which === 13) {
                if (! event.shiftKey) {
                    $scope.send();
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        };

        var modalInstance = $modal.open({
            templateUrl: 'views/user-information-modal.html',
            controller: 'userInformationController',
            windowClass: 'user-information-modal'
        });
    }]);