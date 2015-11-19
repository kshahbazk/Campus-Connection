/**
 * Created by mtbsickrider on 11/17/15.
 */
angular.module("MyApp").controller("viewAd", function($scope, $stateParams, $state){
    if($stateParams._id) {
        var Ad = Parse.Object.extend("Ad")
        var q = new Parse.Query(Ad)
        q.equalTo("objectId",$stateParams._id)
        q.include("productPointer")
        q.include("userPointer")
        q.first({success:function(elem){
            $scope.$apply(function() {
                $scope.ad = elem;//Is this all I need?
                if($scope.ad.attributes.image)
                    $scope.imgurl = $scope.ad.attributes.image.url();

                console.log($scope.ad)
                console.log($scope.user);
                var Feedback = Parse.Object.extend("Feedback")
                var q2 = new Parse.Query(Feedback)
                q2.equalTo("recipientPointer",$scope.ad.attributes.userPointer)
                q2.include("userPointer")
                q2.find({success:function(elems){
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
                                if($scope.ratings[i].attributes.rating)
                                    $scope.total += $scope.ratings[i].attributes.rating
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
                    error: function (user, error) {
                        // Show the error message somewhere and let the user try again.
                        alert("Error: " + error.code + " " + error.message);
                    }
                })
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