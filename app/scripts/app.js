'use strict';

angular.module('NodeChat', [
    'NodeChat.controllers',
    'NodeChat.directives',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
