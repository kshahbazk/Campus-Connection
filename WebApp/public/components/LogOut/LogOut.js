/**
 * Created by johnfranklin on 11/18/15.
 */
angular.module("MyApp").controller("LogOut",function($state){
        Parse.User.logOut()
        document.location.href = "/login"
    }
)