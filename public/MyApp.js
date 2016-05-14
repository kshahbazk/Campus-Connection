/**
 * Created by johnfranklin on 10/15/15.
 */
//while this provided a quick fix for getting a spec result with Jasmine and removing the log statements, this was monkeypatching so it's being removed.
//console.log = function() {}
var app = angular.module('MyApp',["ui.router", "ngResource", 'ui.bootstrap' ])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        //There has to be some way to automatically generate these, outside of the title.
        // HOME STATES AND NESTED VIEWS ========================================
        .state('profile', {
            url: '/profile?_id',
            templateUrl: 'components/profile/pPage.ejs',
            controller: 'profile',
            title: 'User Profiles'

        }).state('home', {
            url: '/home',
            templateUrl: 'components/home/searchlistings.ejs',
            controller: 'home',
            title: 'View All Listings'
        }).state('viewListing', {
            url: '/viewListing?_id',
            templateUrl: 'components/viewListing/viewListing.ejs',
            controller: 'viewListing',
            title: 'View a Listing'
        }).state('createAd', {
            url: '/createAd?_id',
            templateUrl: 'components/createAd/cAd.ejs',
            controller: 'createAd',
            title: 'Make Your Ad'
        }).state('login', {
            url: '/login',
            templateUrl: 'components/login/logIn.ejs',
            controller: 'login',
            title: 'Log In'
        }).state('LandingPage', {
            url: '/',
            templateUrl: 'components/LandingPage/NewLandingPage.ejs',
            title: 'CC'
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
//Filter for currency to add the up arrow for positive, and down for negative
app.filter("custCurrency", function(){
    return function(input, symbol, precision) {
        // Ensure that we are working with a number
        if(isNaN(input)) {
            return input;
        } else {

            // Check if optional parameters are passed, if not, use the defaults
            if(input <= 0)
                return "↓" + (symbol || '$') + (-input).toFixed(precision || 2);
            else
                return "↑" + (symbol || '$') + input.toFixed(precision || 2);
        }
    }
})
//Delta only measuring actual dollars with arrows
app.filter("custDelta", function(){
    return function(input) {
        // Ensure that we are working with a number
        if(isNaN(input)) {
            return input;
        } else {

            if(input <= 0)
                return Math.floor(-input) + "↓"
            else
                return Math.floor(input) + "↑"
        }
    }
})
//Uses binary search on array, then applies the format, checking if the value is between 1 and max.
//I really hope this was worth it, Atif. this was a pain to implement.
// don't pass in the current time to the millisecond; index out of bounds. checking is pretty expensive with lots of values.
var changearray = [{number: 1, max: 1000, format:"ms"},{number: 1000, max: 60, format:"s"},{number: 60000, max: 60,format:"m"},{number: 3600000, max: 24, format:"h"}, {number: 86400000, max: 7, format:"d"}, {number:604800000, max: 4,format:"w"},{number:2.630e+9, max: 12, format:"M"},{number:3.154e+10, max: Infinity, format:"Y"}]
app.filter("custDate", function(){
    return function(input) {
        // Ensure that we are working with a number
        var toCompare = Date.now();
        var dateDelta = (toCompare - new Date(input))
        var i = 3;
        var swing = 2;
        do
        {
            var div = dateDelta/changearray[i].number
            if(div < 0.8)//too small
            {
                i -= swing;
            }
            else if(div > changearray[i].max)//too big
            {
                i += swing;
            }
            else
            {
                return Math.floor(div * 10)/10 + changearray[i].format;
            }
            swing = Math.ceil(swing/2);//will return 1 when swing would divide to 0.5
        }while(true)
    }
})
//Another filter; this one provides more detail.
var changearray2 = [{number: 1, max: 1000, format:"millisecond"},{number: 1000, max: 60, format:"second"},{number: 60000, max: 60,format:"minute"},{number: 3600000, max: 24, format:"hour"}, {number: 86400000, max: 7, format:"day"}, {number:604800000, max: 4,format:"week"},{number:2.630e+9, max: 12, format:"month"},{number:3.154e+10, max: Infinity, format:"year"}]
app.filter("custDateDetailed", function(){
    return function(input) {
        // Ensure that we are working with a number
        var toCompare = Date.now();
        var dateDelta = (toCompare - new Date(input))
        var i = 3;
        var swing = 2;
        do
        {
            var div = dateDelta/changearray2[i].number
            if(div < 0.8)//too small
            {
                i -= swing;
            }
            else if(div > changearray2[i].max)//too big
            {
                i += swing;
            }
            else
            {
                var value = Math.floor(div * 10)/10;
                return value + " " + changearray2[i].format + ( value != 1 ? "s ago" : " ago");
            }
            swing = Math.ceil(swing/2);//will return 1 when swing would divide to 0.5
        }while(true)
    }
})


