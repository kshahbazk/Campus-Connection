/**
 * Created by johnfranklin on 11/10/15.
 */
angular.module('MyApp').controller("profile", function($scope, $state, $stateParams){
    $scope.getFeedback = function()
    {

        console.log($scope.user);
        var Feedback = Parse.Object.extend("Feedback")
        $scope.blank = new Feedback();
        var q = new Parse.Query(Feedback)
        q.equalTo("recipientPointer",$scope.user)
        q.include("userPointer")
        q.find({success:function(elems){

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

    }
    //If user is looking at own profile
    if($stateParams._id) {
        var User = Parse.Object.extend("User")
        var q = new Parse.Query(User)
        q.equalTo("objectId",$stateParams._id)
        q.include("universityPointer")
        q.first({
            success: function (elem) {
                $scope.$apply(function() {
                    $scope.user = elem
                    $scope.currentUser = Parse.User.current()
                    $scope.isCurrentUser = $scope.user.id == $scope.currentUser.id

                })
                if($scope.user)
                    $scope.getFeedback()
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }})
    }
    else
    {
        $scope.isCurrentUser = true;
        $scope.user = $scope.currentUser = Parse.User.current();
        if (!$scope.user)
            $state.go("login")
        $scope.getFeedback()
    }
    $scope.loadReview = function(review)
    {

        $scope.rev = review;
        console.log($scope.rev)

        //load into review submitter?
    }
    $scope.submit = function(){
        if(!$scope.rev.attributes.userPointer)
            $scope.rev.attributes.userPointer= $scope.currentUser;
        if(!$scope.rev.attributes.recipientPointer)
            $scope.rev.attributes.recipientPointer = $scope.user;
        $scope.rev.save($scope.rev, {
            success:function(){
                $state.go($state.current, {}, {reload: true});//reload the current state
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        })
    }

})
