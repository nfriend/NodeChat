'use strict';

angular.module('nodeChat.controllers').
    controller('userInformationController', ['$scope', 'colors', 'userInformation', '$modalInstance', 'profanityCleanser', function ($scope, colors, userInformation, $modalInstance, profanityCleanser) {
        $scope.userInformation = userInformation;
        $scope.colors = colors;

        $scope.selectColor = function(color) {
            userInformation.color = color;
        };

        $scope.nameFieldKeyDown = function (e) {
            if (e.which === 13) {
                $scope.ok();
                e.stopPropagation();
                e.preventDefault();
            }
        };

        $scope.ok = function () {
            $scope.userInformation.name = profanityCleanser.clean($scope.userInformation.name);
            $modalInstance.close();
        };

        $scope.isNameEmptyOrWhitespace = function () {
            return ! /\S/.test($scope.userInformation.name);
        };
    }]);