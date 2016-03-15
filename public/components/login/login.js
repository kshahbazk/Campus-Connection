/**
 * Created by johnfranklin on 10/15/15.
 */
angular.module('MyApp').controller('login', function($scope,$state, $http){
    //Modified from Parse's example

    console.log("BREATHING");
    $scope.logIn = function() {
        //user.email Notification? figure this out after we get connected.
        var toSend = {};
        toSend.username = $scope.username;
        toSend.password = $scope.password;
        // other fields can be set just like with Parse.Object
        $http.post("/user/login", toSend).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            //What do we do to store the current user?
            console.log(response);
            localStorage._id = response.data._id;//Stupid conventions...
            localStorage.firstName = response.data.firstName
            localStorage.lastName = response.data.lastName
            localStorage.location = response.data.location
            localStorage.email = response.data.email;
            localStorage.token = response.data.token;
            console.log(localStorage);
            document.location.href = "/profile"
        }, function errorCallback(response) {
            alert(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })

        //window.location.href = "/login#accepted"
    }


})