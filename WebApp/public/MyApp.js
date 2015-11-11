/**
 * Created by johnfranklin on 10/15/15.
 */
var app = angular.module('MyApp',["ui.router"])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state({name: 'hello',
            url: '/hello',
            templateUrl: 'hello.ejs'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'components/profile/profile.ejs',
            controller: 'profile'

        })
        .state('login', {
            url: '/login',
            templateUrl: 'components/login/logIn.ejs'
        })
        .state('registration', {
            url: '/Registration',
            templateUrl: 'components/register/Registration.ejs',
            controller: 'Register'
        })
        $locationProvider.html5Mode(true);
});

