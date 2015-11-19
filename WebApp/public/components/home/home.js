/**
 * Created by johnfranklin on 11/18/15.
 */
angular.module("MyApp").controller("home", function($scope,$timeout){
    var Ad = Parse.Object.extend("Ad")
    var q = new Parse.Query(Ad)
    q.include("userPointer")
    q.include("userPointer.universityPointer")
    q.ascending("createdAt");
    q.find({success:function(elems){
        //$timeout(
            $scope.$apply(function(){$scope.ads = elems})
            console.log(
                $scope.ads
            )
        //)
    }})
})