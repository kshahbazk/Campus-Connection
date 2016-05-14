/**
 * Created by johnfranklin on 11/10/15.
 */
angular.module('MyApp').controller("profile", function($scope, $state, $stateParams, $uibModal, Feedback, User, Ad){
    $scope.now = Date.now();
    $scope.getFeedback = function()
    {


        $scope.blank = new Feedback();
        Feedback.query({recipientPointer: $scope.user._id, $sort: "-createdAt", $populate:"userPointer"}).$promise.then(function(elems){


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
    var toUse = {$populate:"userPointer ppvPointer", $sort: "-createdAt", $limit: 20};
    var profileTemp = {$populate: "universityPointer", }
    if($stateParams._id) {
        toUse.userPointer = $stateParams._id;
        profileTemp._id = $stateParams._id;
    }
    else
    {
        $scope.isCurrentUser = true;
        toUse.userPointer = localStorage._id;
        profileTemp._id = localStorage._id;
        if (!localStorage.token)
            $state.go("LandingPage")
    }
    User.get(profileTemp).$promise.then(
        function (elem) {
            //console.log(elem);
            $scope.user = elem
            if(elem.universityPointer)
                $scope.user.universityName = elem.universityPointer.name;//resolves problem; localStorage only allows for storage of strings, not objects for security reasons.
            $scope.currentUser = localStorage;//gives enough information to show the user.
            $scope.isCurrentUser = $scope.user._id == $scope.currentUser._id
            if($scope.user)
                $scope.getFeedback()
        },
        function (error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
    })
    $scope.qualityOptions = [{text: "Refurbished", value: 1, style:{color:"#CC0000"}},{text: "Used", value: 2, style:{color:"#CC6600"}},{text: "Slightly Used", value: 3, style:{color:"#666600"}},{text: "Like New", value: 4, style:{color:"#009933"}},{text: "New", value: 5, style:{color:"#00CC00"}}];
    Ad.query(toUse).$promise.then(function(elems){
        //$timeout(
        console.log(elems);
        $scope.ads = elems;
        //)
    })
    $scope.showProfile = function()
    {
        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/profile/editModal.ejs',
            controller: "profileEditModalController",
            resolve: {
                oldScope: function () {
                    return $scope;
                }

            }
        });
    }
    $scope.loadReview = function(review)
    {

        $scope.rev = review;
        if(!$scope.rev.recipientPointer) {
            $scope.ratings.unshift($scope.rev);

        }

        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/profile/commentModal.ejs',
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
                $scope.ratings.shift();
            }
           // console.log($scope.ratings)
        }, function(){
            // dismissed
            if(!$scope.rev.recipientPointer) {
                $scope.ratings.shift();
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
    $scope.rev.createdAt = Date.now();
    $scope.close = function(){
        $uibModalInstance.close();
    }
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
angular.module('MyApp').controller("profileEditModalController",function($scope, $uibModalInstance, File, oldScope){
    $scope.currentUser = oldScope.user;
    $scope.submit = function(){
        $scope.currentUser.$save(function(ret){}
        )
        $uibModalInstance.dismiss();
    }
    $scope.close = function(){
        $uibModalInstance.close();
    }
    $scope.saveFile = function(files, isAvatar) {

        if (files.length > 0) {
            //console.log(files)
            //console.log(files[0])
            //console.log(files[0].name)
            var name = files[0].name;
            for(var i = 0; i < files.length; i++) {
                (function(i) {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        //console.log($scope.user.email);
                        var f = new File();
                        f.fileName = files[i].name.slice(0, files[i].name.lastIndexOf("."))
                        f.fileType = files[i].type;
                        var x = reader.result.indexOf(",")
                        f.encoding = reader.result.slice(reader.result.indexOf(";") + 1, x)
                        //console.log(f.encoding);

                        f.fileContent = reader.result.slice(x + 1);
                        f.$save(function (ret, ret2) {//callback doesn't work if you describe the function as new function(...), only function(...)
                            if(isAvatar)
                                $scope.currentUser.avatarPointer = ret._id
                            else
                                $scope.currentUser.backdropPointer = ret._id
                            //console.log($scope.ad.imagePointer);
                        });
                        //window.location.assign("/profile");
                    };

                    reader.readAsDataURL(files[i]);
                })(i)
            }
        }
    }
})
