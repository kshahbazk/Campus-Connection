/**
 * Created by johnfranklin on 10/15/15.
 */
angular.module('MyApp').controller('login', function($scope,$state){
    //Modified from Parse's example

    console.log("BREATHING");
    $scope.logIn = function() {
        //user.email Notification? figure this out after we get connected.

        // other fields can be set just like with Parse.Object

        Parse.User.logIn($scope.username, $scope.password, {
            success: function (user) {
                // Hooray! Let them use the app now.
                console.log(Parse.User.current())
                $state.go("profile")
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });
        //window.location.href = "/login#accepted"
    }


})