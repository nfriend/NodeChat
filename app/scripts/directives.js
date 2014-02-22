'use strict';

// note: it's not recommended to uses a direct reference to the window object (as in $(window) ),
// but this doesn't seem to work when using the jQuery alias angular.element($window)

angular.module('WebChat.directives', []).
    directive('resize', [function ($window) {
        return function (scope, element, attr) {
            //var w = angular.element($window);
            scope.$watch(function () {
                return { 'h': $(window).outerHeight(), 'w': $(window).outerWidth() };
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

            $(window).bind('resize', function () {
                scope.$apply();
            });
        }
    }]);
