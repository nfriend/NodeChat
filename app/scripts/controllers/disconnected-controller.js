'use strict';

angular.module('nodeChat.controllers').
    controller('disconnectedController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.refresh = function () {
            location.reload();
        };
    }]);