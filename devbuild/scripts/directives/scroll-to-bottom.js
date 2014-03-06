'use strict';

angular.module('nodeChat.directives').
    directive('scrollToBottom', [function () {
        return function (scope, element, attr) {
            scope.scrollToBottom = function () {

                // wrap in setTimeout to schedule this function to run after the DOM has 
                // processed any updates to the target element
                setTimeout(function () {
                    $(element).scrollTop($(element)[0].scrollHeight);
                }, 0);
            };

            // initialize the scroll bar to be at the bottom
            scope.scrollToBottom();
        };
    }]);