/**
 * Created by johnfranklin on 11/10/15.
 */
angular.module('MyApp').controller("profile", function($scope){
    $scope.total = 0.0;
    $scope.ratings = [{rating:5, description:"Great!"},{rating:3, description:"dress fit well despite being big boned"},{rating:2, description:"PRETTY GOOD"},{rating:4, description:"Ruler of Spaghettiland approves"},{rating:3, description:"INCOMPLETE. CAKE LACKED HUMAN SOUL"},{rating:5, description:"5/5 stars would suplex boulder again"},{rating:5, description:"Me and him really went places together 5/5"}]

    //console.log(ratings);
    for(var i = 0; i < $scope.ratings.length; i++){
        $scope.total += $scope.ratings[i].rating;
    }
    $scope.total /= $scope.ratings.length;
})
