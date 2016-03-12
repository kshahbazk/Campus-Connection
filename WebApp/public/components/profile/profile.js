/**
 * Created by johnfranklin on 11/10/15.
 */
angular.module('MyApp').controller("profile", function($scope, $state, $stateParams, Feedback, User){
    $scope.getFeedback = function()
    {

        console.log($scope.user);
        var Feedback = Parse.Object.extend("Feedback")
        $scope.blank = new Feedback();
        Feedback.query({recipientPointer: $scope.user, $populate:"userPointer"}).$promise.then(function(elems){

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
            function(error) {
                // Show the error message somewhere and let the user try again.
                alert(error);
            })

    }
    if($stateParams._id) {
        User.get({_id: $stateParams._id, $populate: "universityPointer"}).$promise.then(
            function (elem) {
                $scope.$apply(function() {
                    $scope.user = elem
                    $scope.currentUser = what;//...? what do I do here?
                    $scope.isCurrentUser = $scope.user.id == $scope.currentUser.id

                })
                if($scope.user)
                    $scope.getFeedback()
            },
            function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            })
    }
    else
    {
        $scope.isCurrentUser = true;
        $scope.user = $scope.currentUser = what;//See previous
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
        if(!$scope.rev.userPointer)
            $scope.rev.userPointer = $scope.currentUser._id
        if(!$scope.rev.recipientPointer)
            $scope.rev.recipientPointer = $scope.user._id;
        $scope.rev.$save().$promise.then(
            function(){
                $state.go($state.current, {}, {reload: true});//reload the current state
            },
            function (error) {
                // Show the error message somewhere and let the user try again.
                alert(error);
            }
        )
    }

})