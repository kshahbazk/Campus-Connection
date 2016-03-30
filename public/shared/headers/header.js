/**
 * Created by johnfranklin on 11/16/15.
 */
angular.module("MyApp").controller("header", function($scope, $uibModal){
    $scope.user = localStorage
    //console.log($scope.user);
    $scope.loginModal = function(){
        $scope.modalInstance = $uibModal.open({
            windowClass: "modal fade",
            animation: true,
            templateUrl: 'loginform',
            controller: "login",
            resolve: {//need to be able to call loginModal/
                oldScope: function () {
                    return $scope;
                }
            }
        });
        $scope.modalInstance.result.then(function(){
            // closed
            // console.log($scope.ratings)
        }, function(){
            // dismissed
            if($scope.toRegister)
                $scope.registerModal();

            // console.log($scope.ratings)
        });
    }
    $scope.registerModal = function(){
        $scope.modalInstance = $uibModal.open({
            windowClass: "modal fade",
            animation: true,
            templateUrl: 'newmember',
            controller: "Register",
            resolve: {//don't need to pass anything here I think?
                oldScope: function () {
                    return $scope;
                }
            }
        });
        $scope.modalInstance.result.then(function(){
            // closed
            $scope.loginModal();
        }, function(){
            // dismissed

        });
    }
})