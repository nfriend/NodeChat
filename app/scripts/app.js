'use strict';

angular.module('WebChat', [
    'WebChat.controllers',
    'WebChat.directives',
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
