/**
 * Created by johnfranklin on 10/15/15.
 */
var app = angular.module('MyApp',["ui.router"])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        //There has to be some way to automatically generate these, outside of the title.
        // HOME STATES AND NESTED VIEWS ========================================
        .state('profile', {
            url: '/profile?_id',
            templateUrl: 'components/profile/profile.ejs',
            controller: 'profile',
            title: 'User Profiles'

        }).state('product', {
            url: '/product',
            templateUrl: 'components/product/AdPage.ejs',
            controller: 'productController',
            title: 'Product'

        })
        .state('login', {
            url: '/login',
            templateUrl: 'components/login/logIn.ejs',
            controller: 'login',
            title: 'Log In'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'components/register/Registration.ejs',
            controller: 'Register',
            title: 'Registering for CampusConnection'
        })
        $locationProvider.html5Mode(true);
});
//Borrowed from stackexchange, specifically http://stackoverflow.com/questions/23813599/set-page-title-using-ui-router
// Sets the title of the page.
app.directive('updateTitle', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        return {
            link: function(scope, element) {

                var listener = function(event, toState) {

                    var title = 'Default Title';
                    if (toState.title) title = toState.title;

                    $timeout(function() {
                        element.text(title);
                    }, 0, false);
                };
                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
]);

