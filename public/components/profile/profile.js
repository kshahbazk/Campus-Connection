/**
 * Created by johnfranklin on 11/10/15.
 */
angular.module('MyApp').controller("profile", function($scope, $state, $stateParams, $uibModal, Feedback, User){
    $scope.getFeedback = function()
    {


        $scope.blank = new Feedback();
        Feedback.query({recipientPointer: $scope.user._id, $populate:"userPointer"}).$promise.then(function(elems){


                $scope.total = 0.0;
                $scope.ratings = elems
                //console.log($scope.ratings);
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

        },
            function(error) {
                // Show the error message somewhere and let the user try again.
                alert(error);
            })

    }
    if($stateParams._id) {
        User.get({_id: $stateParams._id, $populate: "universityPointer"}).$promise.then(
            function (elem) {
                //console.log(elem);
                $scope.user = elem
                if(elem.universityPointer)
                    $scope.user.universityName = elem.universityPointer.name;//resolves problem; localStorage only allows for storage of strings, not objects for security reasons.
                $scope.currentUser = localStorage;//...? what do I do here?
                $scope.isCurrentUser = $scope.user._id == $scope.currentUser._id
                if($scope.user)
                    $scope.getFeedback()
            },
            function (error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            })
    }
    else
    {
        $scope.isCurrentUser = true;
        $scope.user = $scope.currentUser = localStorage;//See previous
        if (!$scope.user.token)
            $state.go("login")
        $scope.getFeedback()
    }
    $scope.loadReview = function(review)
    {

        $scope.rev = review;
        if(!$scope.rev.recipientPointer) {
            $scope.ratings.push($scope.rev);
        }

        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: "modalController",
            resolve: {
                oldScope: function () {
                    return $scope;
                }

            }
        });
        //console.log($scope.rev)
        $scope.modalInstance.result.then(function(){
            // closed
            if(!$scope.rev.recipientPointer) {
                $scope.ratings.pop();
            }
           // console.log($scope.ratings)
        }, function(){
            // dismissed
            if(!$scope.rev.recipientPointer) {
                $scope.ratings.pop();
            }
            else if(!$scope.rev.recipientPointer._id) {

            }

           // console.log($scope.ratings)
        });
        //load into review submitter?
    }


})
angular.module('MyApp').controller("modalController",function($scope, $uibModalInstance, oldScope){
    $scope.rev = oldScope.rev;
    $scope.submit = function() {
        var noUser = false
        if (!$scope.rev.userPointer) {
            noUser = true;
            $scope.rev.userPointer = localStorage._id
        }

        if (!$scope.rev.recipientPointer) {
            $scope.rev.recipientPointer = oldScope.user._id;
            oldScope.total = (oldScope.total * oldScope.ratings.length + oldScope.rev.rating) / (oldScope.ratings.length + 1);

        }
        //Callbacks work, but promises do NOT work with save. I cannot figure out why.

        $scope.rev.$save(function(){
            $scope.rev.userPointer = {
                firstName: oldScope.currentUser.firstName,
                lastName: oldScope.currentUser.lastName,
                _id: oldScope.currentUser._id
            };
            console.log("update works?")
        })


        $uibModalInstance.dismiss();

    }
})
