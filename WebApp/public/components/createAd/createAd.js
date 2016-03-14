
angular.module('MyApp').controller('createAd', function($scope, $state, $stateParams, $timeout, Ad, Product, File, Ppvcache){
    $scope.qualityOptions = [{text: "Broken", value: 0},{text: "Bad", value: 1},{text: "Average", value: 2},{text: "Good", value: 3},{text: "New", value: 4}];
    if($stateParams._id)//update
    {

        Ad.get({_id: $stateParams._id, $populate:"userPointer ppvPointer"}).then(function(elem){

                $scope.ad = elem
                console.log(elem)
            },
            function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        )

    }
    else//create
    {
        $scope.ad = new Ad();
        console.log($scope.ad)
    }
    //don't call it createAd in the function. seems like initialize, not persist to DB
    $scope.persistAd = function() {
        //JOHN: productId isn't defined. how about querying the Product Table to see if the name lines up?
        console.log($scope.ad.imagedata);
        //$scope.ad.attributes.image= new Parse.File("photo.png", $scope.ad.imagedata)
        Product.query({name: $scope.ad.productName}).$promise.then(function(elems){

            console.log(elems)

            if (elems.length==0) {//no such element?


                var product = new Product();
                //default price right?
                product.name = $scope.ad.productName;
                //Is this what we should do? seems iffy to base the weighted average on the first posting
                //I guess future modifications will be based on cloud code or something.
                product.$save(
                    function(response) {
                        console.log($scope.ad)

                        $scope.persistAdParse();
                    });
            } else {
                $scope.persistAdParse();
            }
        //Always reset the product anew on edit.

        },function (error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error);
            persistAdParse();
        })


 }
    $scope.persistAdParse = function() {
        console.log($scope.ad)
        $scope.ad.userPointer = localStorage._id;
        $scope.ad.ppvPointer = $scope.ad.ppvPointer._id;
        console.log($scope.ad)

        $scope.ad.$save(
        function(ad) {
               console.log($scope.ad)
               $state.go("viewListing",{_id: $scope.ad._id})
            }
        );

        //In the future, we might have a search bar that includes the different options. not there right now, so...


    }


    $scope.$saveFile = function(files) {
        if (files.length > 0) {
            console.log(files)
            console.log(files[0])
            console.log(files[0].name)
            var name = files[0].name;
            var reader = new FileReader();
            reader.onloadend = function () {
                console.log($scope.user.email);
                var f = new File();
                f.fileContent = reader.result;
                f.$save(new function(ret){
                    $scope.ad.filePointer = f._id;
                });
                //window.location.assign("/profile");
            };

            reader.readAsDataURL(files[0]);

        }
    }
    $scope.findPPV = new function(){
        if($scope.ad.productName && $scope.ad.quality)
        {
            Ppvcache.get({productName: $scope.ad.productName, quality: $scope.ad.quality, location: localStorage.location}).then(function(elem){
                $scope.ad.ppvPointer = elem;
            })
        }
    }

})