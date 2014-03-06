'use strict';

// Declare app level module which depends on filters, and services
angular.module('nodeChat', [
    'ngRoute',
    'nodeChat.filters',
    'nodeChat.services',
    'nodeChat.directives',
    'nodeChat.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'views/main.html', controller: 'mainController' });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
