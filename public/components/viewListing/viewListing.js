/**
 * Created by mtbsickrider on 11/17/15.
 */

angular.module("MyApp").controller("viewListing", function($scope, $stateParams, $state, Ad, Feedback){
    $scope.qualityOptions = [{text: "Refurbished", value: 1, style:{color:"#CC0000"}},{text: "Used", value: 2, style:{color:"#CC6600"}},{text: "Slightly Used", value: 3, style:{color:"#666600"}},{text: "Like New", value: 4, style:{color:"#009933"}},{text: "New", value: 5, style:{color:"#00CC00"}}];

    if($stateParams._id) {

        Ad.get({_id: $stateParams._id, $populate:"userPointer ppvPointer"}).$promise.then(function(elem){

            $scope.listing = elem;//Is this all I need?
            console.log($scope.listing)
            console.log($scope.user)
            Ad.query({$populate:"userPointer ppvPointer", $sort: "-createdAt", $limit: 4, searchArray: {$in: $scope.listing.searchArray}}).$promise.then(function(elems){
                //$timeout(
                //console.log(elems);
                $scope.ads = elems
                //)
            })
            Feedback.query({recipientPointer: $scope.listing.userPointer._id, $populate:"userPointer"}).$promise.then(function(elems){
                console.log(elems)

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

            },
            function (error) {
                // Show the error message somewhere and let the user try again.
                console.log("Feedback")
                alert(error);
            })

        },
        function (error) {
            // Show the error message somewhere and let the user try again.
            console.log("Which error")
            alert("Adblock Ultimate not supported due to being overzealous with URLs and blocking listing . Use Adblock Plus instead on FireFox.");
        })


    }
    else{//????
        $state.go("home");
    }
})