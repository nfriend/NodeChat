'use strict';

angular.module('nodeChat.controllers').
    controller('mainController', ['$scope', '$modal', 'websocketConnection', 'colors', 'userInformation', function ($scope, $modal, websocketConnection, colors, userInformation) {

        if (!('WebSocket' in window)) {
            $modal.open({
                templateUrl: 'views/outdated-browser-modal.html',
                windowClass: 'outdated-browser-modal',
                backdrop: 'static',
                keybaord: false
            });

            return;
        }

        var whoosh = new Audio('audio/whoosh-mid.mp3');
        var userInformationModalInstance;
        $scope.messages = [];
        $scope.chatInput = '';

        websocketConnection.on('error', function () {
            userInformationModalInstance.close();

            $modal.open({
                templateUrl: 'views/could-not-connect-modal.html',
                controller: 'couldNotConnectController',
                windowClass: 'could-not-connect-modal',
                backdrop: 'static',
                keyboard: false
            });
        });

        websocketConnection.on('recieve', function (data) {
            if (data.type === 'new') {
                data.isMyMessage = false;
                $scope.messages.push(data);
                whoosh.play();

                if ($scope.messages.length > 250) {
                    $scope.messages.splice(0, 1);
                }

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
            $modal.open({
                templateUrl: 'views/disconnected-modal.html',
                controller: 'disconnectedController',
                windowClass: 'disconnected-modal',
                backdrop: 'static',
                keyboard: false
            });
        });

        websocketConnection.connect();

        $scope.send = function () {

            // don't send if the message is empty
            if (! /\S/.test($scope.chatInput)) {
                return;
            }

            var newMessage = {
                'type': 'new',
                'name': userInformation.name,
                'message': $scope.chatInput,
                'isMyMessage': true,
                'color': userInformation.color
            };

            $scope.messages.push(newMessage);
            websocketConnection.send(newMessage);

            if ($scope.messages.length > 250) {
                $scope.messages.splice(0, 1);
            }

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

        userInformationModalInstance = $modal.open({
            templateUrl: 'views/user-information-modal.html',
            controller: 'userInformationController',
            windowClass: 'user-information-modal',
            backdrop: 'static',
            keyboard: false
        });
    }]);