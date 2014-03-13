'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('nodeChat.services')
    .factory('websocketConnection', ['$window', '$rootScope', function ($window, $rootScope) {
        var websocketConnectionInstance = {};
        var connection;
        var _recieveHandlers = [], _errorHandlers = [], _connectHandlers = [], _disconnectHandlers = [];

        websocketConnectionInstance.connect = function () {
            connection = new WebSocket('ws://127.0.0.1:8080', 'nodechat-protocol');
            connection.onopen = function () {
                $rootScope.$apply(function () {
                    _connectHandlers.forEach(function (element, index, array) { element(); });
                });
            };
            connection.onclose = function () {
                $rootScope.$apply(function () {
                    _disconnectHandlers.forEach(function (element, index, array) { element(); });
                });
            }
            connection.onerror = function () {
                $rootScope.$apply(function () {
                    _errorHandlers.forEach(function (element, index, array) { element(); });
                });
            };
            connection.onmessage = function (message) {
                setTimeout(function () {
                    $rootScope.$apply(function () {
                        try {
                            var data = JSON.parse(message.data);
                        } catch (e) {
                            console.log("NodeChat: websocketConnection service: failed to JSON.parse data: " + data);
                            _errorHandlers.forEach(function (element, index, array) { element(data); });
                        }

                        _recieveHandlers.forEach(function (element, index, array) { element(data); });
                    });
                }, 250);
            };
        }

        websocketConnectionInstance.send = function (data) {
            if (connection) {
                connection.send(JSON.stringify(data));
            }
        };

        websocketConnectionInstance.on = function (eventType, handler) {
            if (eventType === 'recieve') {
                _recieveHandlers.push(handler);
            } else if (eventType === 'error') {
                _errorHandlers.push(handler);
            } else if (eventType === 'connect') {
                _connectHandlers.push(handler);
            } else if (eventType === 'disconnect') {
                _disconnectHandlers.push(handler);
            }
        };

        websocketConnectionInstance.off = function (eventType, handler) {
            if (eventType === 'recieve') {
                var index = _recieveHandlers.indexOf(handler);
                if (index === -1) {
                    return false;
                } else {
                    _recieveHandlers.splice(index, 1);
                    return true;
                }
            } else if (eventType === 'error') {
                var index = _errorHandlers.indexOf(handler);
                if (index === -1) {
                    return false;
                } else {
                    _errorHandlers.splice(index, 1);
                    return true;
                }
            } else if (eventType === 'connect') {
                var index = _connectHandlers.indexOf(handler);
                if (index === -1) {
                    return false;
                } else {
                    _connectHandlers.splice(index, 1);
                    return true;
                }
            } else if (eventType === 'disconnect') {
                var index = _disconnectHandlers.indexOf(handler);
                if (index === -1) {
                    return false;
                } else {
                    _disconnectHandlers.splice(index, 1);
                    return true;
                }
            }
        };

        return websocketConnectionInstance;
    }]);
