'use strict';

angular.module('nodeChat.filters').
    filter('profanityFilter', ['profanityCleanser', function (profanityCleanser) {
        return function (text) {
            return profanityCleanser.clean(text);
        };
    }]);
