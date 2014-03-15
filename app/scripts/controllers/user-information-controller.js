'use strict';

angular.module('nodeChat.controllers').
    controller('userInformationController', ['$scope', 'colors', 'userInformation', '$modalInstance', function ($scope, colors, userInformation, $modalInstance) {
        $scope.userInformation = userInformation;
        $scope.colors = colors;

        $scope.selectColor = function(color) {
            userInformation.color = color;
        };

        $scope.ok = function () {
            $modalInstance.close();
        };
    }]);