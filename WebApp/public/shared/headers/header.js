/**
 * Created by johnfranklin on 11/16/15.
 */
angular.module("MyApp").controller("header", function($scope){
    $scope.user = Parse.User.current();
    console.log($scope.user);
})