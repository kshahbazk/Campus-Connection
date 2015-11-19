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

        }).state('home', {
            url: '/home',
            templateUrl: 'components/home/AdMain.ejs',
            controller: 'home',
            title: 'Ad'
        }).state('viewAd', {
            url: '/viewAd?_id',
            templateUrl: 'components/viewAd/AdDisplay.ejs',
            controller: 'viewAd',
            title: 'Ad'
        }).state('createAd', {
            url: '/createAd?_id',
            templateUrl: 'components/createAd/AdCreate.ejs',
            controller: 'createAd',
            title: 'Make Your Ad'
        }).state('login', {
            url: '/login',
            templateUrl: 'components/login/logIn.ejs',
            controller: 'login',
            title: 'Log In'
        }).state('LogOut', {
            url: '/LogOut',
            template: '<p>Logging Out...</p>',
            controller: 'LogOut',
            title: 'Goodbye'
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
//Liberated from stackExchange. Annoying problem that isn't the focus of this course.
// http://stackoverflow.com/questions/23927695/angularjs-currency-formatting-in-input-box
app.directive('currencyFormatter', ['$filter', function ($filter) {


    formatter = function (num) {
        return $filter('currency')(num);
    };

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            ngModel.$parsers.push(function (str) {
                return str ? Number(str) : '';
            });
            ngModel.$formatters.push(formatter);

            element.bind('blur', function() {
                element.val(formatter(ngModel.$modelValue))
            });
            element.bind('focus', function () {
                element.val(ngModel.$modelValue);
            });
        }
    };
}]);
//Once more liberated from stack exchange. handles filereads.
// http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file
