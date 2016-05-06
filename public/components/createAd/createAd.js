
angular.module('MyApp').controller('createAd', function($scope, $state, $stateParams, $timeout, $http, Ad, Product, File, Ppvcache){
    $scope.qualityOptions = [{text: "Refurbished", value: 1, style:{color:"#CC0000"}},{text: "Used", value: 2, style:{color:"#CC6600"}},{text: "Slightly Used", value: 3, style:{color:"#666600"}},{text: "Like New", value: 4, style:{color:"#009933"}},{text: "New", value: 5, style:{color:"#00CC00"}}];
    if($stateParams._id)//update
    {

        Ad.get({_id: $stateParams._id, $populate:"userPointer ppvPointer"}).$promise.then(function(elem){

                $scope.ad = elem
                //console.log(elem)
            },
            function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        )

    }
    else//create
    {//Weird bug. not showing changes to amazonRoutes for git
        $scope.ad = new Ad();
        //console.log($scope.ad)
    }
    //don't call it createAd in the function. seems like initialize, not persist to DB
    $scope.getAmazonResults = function(str)
    {
        return $http.get("web/amazonLookup/" + str, {}).then(function (response) {
            //console.log("Are you there?")
            //console.log(response.data)
            return response.data
        })
    }

    $scope.persistAd = function() {
        //JOHN: productId isn't defined. how about querying the Product Table to see if the name lines up?
        //console.log($scope.ad.imagedata);
        //$scope.ad.attributes.image= new Parse.File("photo.png", $scope.ad.imagedata)
        Product.query({name: $scope.ad.productName}).$promise.then(function(elems){

            console.log(elems)

            if (elems.length==0) {//no such element?


                var product = new Product();
                //default price right?
                product.name = $scope.ad.productName;
                //Is this what we should do? seems iffy to base the weighted average on the first posting
                //I guess future modifications will be based on server code or something.
                product.$save(
                    function(response) {
                        console.log("in product save: "+ $scope.ad)

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
        if($scope.ad.ppvPointer)//always populated if it exists, so no risk of
            $scope.ad.ppvPointer = $scope.ad.ppvPointer._id;
        //console.log($scope.ad)
        $scope.ad.searchArray = [];
        if($scope.ad.title)
            Array.prototype.push.apply($scope.ad.searchArray, $scope.ad.title.toLowerCase().split(" "))
        if($scope.ad.description)
            Array.prototype.push.apply($scope.ad.searchArray, $scope.ad.description.toLowerCase().split(" "))
        if($scope.ad.productName)
            Array.prototype.push.apply($scope.ad.searchArray, $scope.ad.productName.toLowerCase().split(" "))
        //console.log($scope.ad.searchArray);
        if(!$scope.ad.ppvPointer)//still not defined for some reason
        {
            var ppv = new Ppvcache();
            ppv.location = localStorage.location;
            ppv.productName = $scope.ad.productName;
            ppv.weight = 0;//weight = 0 rounds out disappears the actual value in calculation with spark.
            ppv.quality = $scope.ad.quality;
            ppv.ppv = $scope.ad.price
            ppv.$save(
                function(ppvud) {
                    $scope.ad.ppvPointer = ppvud._id
                    $scope.finalSave()
                })
        }
        else {
            $scope.finalSave()
        }

        //In the future, we might have a search bar that includes the different options. not there right now, so...


    }
    $scope.finalSave = function()
    {
        $scope.ad.$save(
            function (ad) {
                //console.log($scope.ad)
                $state.go("viewListing", {_id: $scope.ad._id})
            }
        );
    }
    $scope.saveFile = function(files) {
        $scope.ad.imagePointer = [];
        if (files.length > 0) {
            //console.log(files)
            //console.log(files[0])
            //console.log(files[0].name)
            var name = files[0].name;
            for(var i = 0; i < files.length; i++) {
                (function(i) {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        //console.log($scope.user.email);
                        var f = new File();
                        f.fileName = files[i].name.slice(files[i].name.lastIndexOf("."))
                        f.fileType = files[i].type;
                        var x = reader.result.indexOf(",")
                        f.encoding = reader.result.slice(reader.result.indexOf(";") + 1, x)
                        //console.log(f.encoding);

                        f.fileContent = reader.result.slice(x + 1);
                        f.$save(function (ret, ret2) {//callback doesn't work if you describe the function as new function(...), only function(...)
                            $scope.ad.imagePointer.push(ret._id);
                            //console.log($scope.ad.imagePointer);
                        });
                        //window.location.assign("/profile");
                    };

                    reader.readAsDataURL(files[i]);
                })(i)
            }
        }
    }
    $scope.findPPV = function(){
        if($scope.ad.productName && $scope.ad.quality)
        {
            $http.get('web/getPPV',{params: {productName: $scope.ad.productName, quality: $scope.ad.quality, location: localStorage.location}}).then(function(elem){
                if(elem) {
                    console.log(elem.data)
                    $scope.ad.ppvPointer = elem.data
                }
                else {
                    //should never happen
                    console.log("Where is PPV?")
                    //what do we do here?
                }
            },
            function (user, error) {
                // Show the error message somewhere and let the user try again.
               console.log(user);
            })
        }
    }

})