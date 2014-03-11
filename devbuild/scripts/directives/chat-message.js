'use strict';

angular.module('nodeChat.directives').
    directive('chatMessage', [function () {
        return {
            templateUrl: 'views/chat-message.html',
            scope: {
                name: '=',
                message: '=',
                isMyMessage: '='
            },
            //link: function (scope, element, attr) {

            //}
        };
    }]);