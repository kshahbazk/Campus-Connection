/**
 * Created by johnfranklin on 11/18/15.
 */
angular.module("MyApp").controller("home", function($scope,$timeout, Ad){
    Ad.query({$populate:"userPointer productPointer", $sort: "createdAt"}).$promise.then(function(elems){
        //$timeout(
            $scope.$apply(function(){$scope.ads = elems})
            console.log(
                $scope.ads
            )
        //)
    })
})