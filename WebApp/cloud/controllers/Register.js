/**
 * Created by johnfranklin on 10/15/15.
 */
angular.module('myApp').controller('Register', function(){
    this.a
    //Modified from Parse's example

    this.createAccount = function() {
        if (this.password1 != this.password2) {
            //Send message saying the passwords don't match. implement later.
            return;
        }

        var user = new Parse.User();
        user.set("username", this.username);
        user.set("password", this.password1);
        user.set("email", this.email);
        user.set("FirstName", this.fName);
        user.set("LastName", this.lName);
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
        window.location.href = "/login#accepted"
    }


})