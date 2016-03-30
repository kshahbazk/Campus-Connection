/**
 * Created by johnfranklin on 11/18/15.
 */
angular.module("MyApp").controller("LogOut",function($state){
        delete localStorage.firstName;
        delete localStorage.lastName;
        delete localStorage._id;
        delete localStorage.email;
        delete localStorage.location;
        delete localStorage.token;
        document.location.href = "/LandingPage"
    }
)