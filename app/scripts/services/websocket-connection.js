'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('nodeChat.services')
    .factory('websocketConnection', ['$window', '$rootScope', function ($window, $rootScope) {
        var websocketConnectionInstance = {};
        var connection;
        var _recieveHandlers = [], _errorHandlers = [], _connectHandlers = [], _disconnectHandlers = [];

        // used to differentiate between a disconnect and a failure to connect initially
        var connectionWasOpen = false;

        websocketConnectionInstance.connect = function () {
            if (document.location.hostname === 'nathanfriend.com' || document.location.hostname === 'nathanfriend.cloudapp.net') {
                connection = new WebSocket('ws://nf-backend.cloudapp.net:8080', 'nodechat-protocol');
            } else {
                connection = new WebSocket('ws://127.0.0.1:8080', 'nodechat-protocol');
            }

            connection.onopen = function () {
                $rootScope.$apply(function () {
                    connectionWasOpen = true;
                    _connectHandlers.forEach(function (element, index, array) { element(); });
                });
            };
            connection.onclose = function () {
                if (connectionWasOpen) {
                    $rootScope.$apply(function () {
                        _disconnectHandlers.forEach(function (element, index, array) { element(); });
                    });
                }
            };
            connection.onerror = function () {
                if (!connectionWasOpen) {
                    $rootScope.$apply(function () {
                        _errorHandlers.forEach(function (element, index, array) { element(); });
                    });
                }
            };
            connection.onmessage = function (message) {
                $rootScope.$apply(function () {
                    try {
                        var data = JSON.parse(message.data);
                    } catch (e) {
                        console.log('NodeChat: websocketConnection service: failed to JSON.parse data: ' + data);
                        _errorHandlers.forEach(function (element, index, array) { element(data); });
                    }

                    _recieveHandlers.forEach(function (element, index, array) { element(data); });
                });
            };
        };

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
                if (_recieveHandlers.indexOf(handler) === -1) {
                    return false;
                } else {
                    _recieveHandlers.splice(_recieveHandlers.indexOf(handler), 1);
                    return true;
                }
            } else if (eventType === 'error') {
                if (_errorHandlers.indexOf(handler) === -1) {
                    return false;
                } else {
                    _errorHandlers.splice(_errorHandlers.indexOf(handler), 1);
                    return true;
                }
            } else if (eventType === 'connect') {
                if (_connectHandlers.indexOf(handler) === -1) {
                    return false;
                } else {
                    _connectHandlers.splice(_connectHandlers.indexOf(handler), 1);
                    return true;
                }
            } else if (eventType === 'disconnect') {
                if (_disconnectHandlers.indexOf(handler) === -1) {
                    return false;
                } else {
                    _disconnectHandlers.splice(_disconnectHandlers.indexOf(handler), 1);
                    return true;
                }
            }
        };

        return websocketConnectionInstance;
    }]);
