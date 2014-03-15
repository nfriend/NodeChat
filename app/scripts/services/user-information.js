'use strict';

angular.module('nodeChat.services')
    .factory('userInformation', ['colors', function (colors) {
        return {
            name: 'Human',
            color: colors[0]
        };
    }]);
