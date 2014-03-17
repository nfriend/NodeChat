'use strict';

angular.module('nodeChat.controllers').
    controller('couldNotConnectController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.refresh = function () {
            location.reload();
        };
    }]);