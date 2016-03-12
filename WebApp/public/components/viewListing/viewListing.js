/**
 * Created by mtbsickrider on 11/17/15.
 */
angular.module("MyApp").controller("viewListing", function($scope, $stateParams, $state, Ad, Feedback){
    if($stateParams._id) {
        var Ad = Parse.Object.extend("Ad")
        var q = new Parse.Query(Ad)
        q.equalTo("objectId",$stateParams._id)
        q.include("productPointer")
        q.include("userPointer")
        Ad.query({_id: $stateParams._id, $populate:"productPointer userPointer"}).$promise.then(function(elem){
            $scope.$apply(function() {
                $scope.ad = elem;//Is this all I need?
                if($scope.ad.attributes.image)
                    $scope.imgurl = $scope.ad.attributes.image.url();

                console.log($scope.ad)
                console.log($scope.user)
                Feedback.query({recipientPointer: $scope.ad.userPointer._id, $populate:"userPointer"}).$promise.then(function(elems){
                    console.log(elems)
                    $scope.$apply(function() {
                        $scope.total = 0.0;
                        $scope.ratings = elems

                        //console.log(ratings);
                        if($scope.ratings.length <= 0)
                        {
                            $scope.noreviews=true;
                        }
                        else {
                            for (var i = 0; i < $scope.ratings.length; i++) {
                                if($scope.ratings[i].rating)
                                    $scope.total += $scope.ratings[i].rating
                            }
                            $scope.total /= $scope.ratings.length;
                        }
                        if(!$scope.isCurrentUser)
                        {
                            $scope.rev = new Feedback();
                        }
                        $scope.loaded=true;
                    })
                },
                    function (error) {
                        // Show the error message somewhere and let the user try again.
                        alert(error);
                    })
            })
            },
            function (error) {
                // Show the error message somewhere and let the user try again.
                alert(error);
            })

    }
    else{//????
        $state.go("home");
    }
})