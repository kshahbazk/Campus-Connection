/**
 * Created by mtbsickrider on 11/17/15.
 */
angular.module("MyApp").controller("viewAd", function($scope, $stateParams, $state){
    if($stateParams._id) {
        var Ad = Parse.Object.extend("Ad")
        var q = new Parse.Query(Ad)
        q.equalTo("objectId",$stateParams._id)
        q.include("productPointer")

        q.first({success:function(elem){
            $scope.$apply(function() {
                $scope.ad = elem;//Is this all I need?
                console.log($scope.ad)
            })
        },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        })
    }
    else{//????
        $state.go("home");
    }
})