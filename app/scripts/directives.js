'use strict';

angular.module('NodeChat.directives', []).

    // listens to the height and width of the window, and puts a style() method
    // that returns the height and width of the window, minus any offset as specified
    // by the widthOffset and heightOffset attributes.  Width or height can be ignored
    // by this directive by adding the "ignore" attribute with a "w" or "h" parameter, respecively
    directive('resize', ['$window', function ($window) {
        return function (scope, element, attr) {
            var w = angular.element($window);
            scope.$watch(function () {
                return { 'h': w.outerHeight(), 'w': w.outerWidth() };
            }, function (newValue, oldValue) {
                scope.style = function () {
                    var style = {};
                    if (!attr.ignore || angular.lowercase(attr.ignore) !== 'w') {
                        style.width = newValue.w - (attr.widthOffset || 0) + 'px'
                    }
                    if (!attr.ignore || angular.lowercase(attr.ignore) !== 'h') {
                        style.height = newValue.h - (attr.heightOffset || 0) + 'px'
                    }

                    return style;
                };

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
    }]).

    // adds a method to the object's scope, scrollToBottom(), that will 
    // scroll to the bottom of the element when called
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
        }
    }]).

    directive('chatMessage', [function () {
        return {
            templateUrl: "views/chat-message.html",
            scope: {
                name: '=',
                message: '=',
                isMyMessage: "="
            },
            link: function (scope, element, attr) {
                
            }
        }
    }]);
