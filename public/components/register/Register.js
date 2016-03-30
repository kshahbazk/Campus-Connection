/**
 * Created by johnfranklin on 10/15/15.
 */
angular.module('MyApp').controller('Register', function($scope, $state, $http, $uibModalInstance,University){
    //Modified from Parse's example
    //OK, I've finally figured out how this works. $scope refers to the scope for the function, while this is the scope for the function currently...?
   console.log("BREATHING");
    //console.log(University);
    University.query(
        function (elems) {
            console.log(elems);
            //$scope.universities = [];
            //This isn't necessary in the future. name is equivalent to r.attribute.name, no need for get
            $scope.updateUniversities(elems.map(function(r){return {text: r.name, value: r._id}}));

        })
    $scope.dismiss = function(){
        $uibModalInstance.dismiss();
    }
    $scope.updateUniversities= function(universities){

        $scope.universities = universities;
    }
    //$scope.updateUniversities([{text:"Dummyval1",value:"Dummyval2"}]);
    $scope.createAccount = function() {
        if ($scope.user.password != $scope.password2) {
            //Send message saying the passwords don't match. implement later.
            alert("Passwords don't match");
            return;
        }
        console.log(this);


        //user.email Notification? figure this out after we get connected.

        // other fields can be set just like with Parse.Object

        $http.post("/user/register", $scope.user).then(
            function(user) {
                // Hooray! Let them use the app now.

                $uibModalInstance.close();
            },
            function(error) {
                // Show the error message somewhere and let the user try again.
                console.log(error);
                alert(error.data);
            }
        );
        console.log($scope.user);
        //window.location.href = "/login#accepted"
    }


})