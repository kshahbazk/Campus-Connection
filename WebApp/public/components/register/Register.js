/**
 * Created by johnfranklin on 10/15/15.
 */
angular.module('MyApp').controller('Register', function($scope){
    //Modified from Parse's example
    //OK, I've finally figured out how this works. $scope refers to the scope for the function, while this is the scope for the function currently...?
    var University = Parse.Object.extend("University")
    console.log("BREATHING");
    console.log(University);
    var query = new Parse.Query(University)

    try{
    query.find({
        success: function (elems) {
            //$scope.universities = [];
            //done this way to prevent calling a method over and over when the page updates
            $scope.updateUniversities(elems.map(function(r){return {text: r.get("name"), value: r}}));

        }})}
    catch(e)//for home testing.
    {console.log(e)}
    $scope.updateUniversities= function(universities){
        //Holy shit. this is a hell of a bug, rooted deep in facets of angular I wasn't aware of.
        //angular doesn't refresh objects until the user interacts with them.
        // clicking the dropdown doesn't constitute interacting, so they won't see the variables.
        // if they type in a value into any of the other elements, the options pop up.
        // resolution is simple when you know the problem however;
        // use $scope.$apply, and pass a function making the changes that aren't showing up.
        $scope.$apply(function(){
            $scope.universities = universities;
        })
    }
    //$scope.updateUniversities([{text:"Dummyval1",value:"Dummyval2"}]);
    $scope.createAccount = function() {
        if ($scope.password1 != $scope.password2) {
            //Send message saying the passwords don't match. implement later.
            alert("Passwords don't match");
            return;
        }
        console.log(this);
        {
        user = new Parse.User();
        user.set("username", $scope.username);
        user.set("password", $scope.password1);
        user.set("email", $scope.email);
        user.set("FirstName", $scope.fName);
        user.set("universityPointer", $scope.university);
        user.set("LastName", $scope.lName);
        //user.email Notification? figure this out after we get connected.

        // other fields can be set just like with Parse.Object

        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.

            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });
        console.log(user);
        //window.location.href = "/login#accepted"
    }


}})