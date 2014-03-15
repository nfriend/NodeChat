'use strict';

angular.module('nodeChat', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'ui.bootstrap',
    'nodeChat.filters',
    'nodeChat.services',
    'nodeChat.directives',
    'nodeChat.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'views/main.html', controller: 'mainController' });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
