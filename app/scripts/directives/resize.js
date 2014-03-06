'use strict';

angular.module('nodeChat.directives').
    directive('resize', ['$window', function ($window) {
        console.log('here');
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
        };
    }]);
