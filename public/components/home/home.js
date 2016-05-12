/**
 * Created by johnfranklin on 11/18/15.
 */
angular.module("MyApp").controller("home", function($scope,$timeout, Ad, $stateParams, $state){
    $scope.number = 0;
    var toUse = {$populate:"userPointer ppvPointer", $sort: "-createdAt", $limit: 75};
    if($stateParams.query)
        toUse.searchArray = {$in: query.toLowerCase().split(" ")}
    $scope.qualityOptions = [{text: "Refurbished", value: 1, style:{color:"#CC0000"}},{text: "Used", value: 2, style:{color:"#CC6600"}},{text: "Slightly Used", value: 3, style:{color:"#666600"}},{text: "Like New", value: 4, style:{color:"#009933"}},{text: "New", value: 5, style:{color:"#00CC00"}}];
    Ad.query(toUse).$promise.then(function(elems){
        //$timeout(
        console.log(elems);
            $scope.ads = elems
        //)
    })
    $scope.search = function(query){

        //$state.go("home",{query: query}, {reloadOnSearch:false})
        //console.log(query.toLowerCase().split());
        Ad.query({$populate:"userPointer ppvPointer", $sort: "-createdAt", searchArray: {$in: query.toLowerCase().split(" ")}}).$promise.then(function(elems){
            //$timeout(
            //console.log(elems);
            $scope.number = 0;
            $scope.ads = elems
            //)
        })
    }
})