/**
 * Created by johnfranklin on 11/18/15.
 */
angular.module("MyApp").controller("home", function($scope,$timeout, Ad){
    $scope.qualityOptions = [{text: "Broken", value: 1},{text: "Bad", value: 2},{text: "Average", value: 3},{text: "Good", value: 4},{text: "New", value: 5}];
    Ad.query({$populate:"userPointer ppvPointer", $sort: "createdAt"}).$promise.then(function(elems){
        //$timeout(
            $scope.ads = elems
        //)
    })
})