
angular.module('MyApp').controller('createAd', function($scope, $state, $stateParams, $timeout, Ad, Product){
    //Variables $scope.createAd needs to be initialized

    if(!Parse.User.current())
        $state.go("login")//Should we have a redirect?
    //Hm. noticing a lot of repetition here.
    //I may move some of the common behaviors in profile out to services that function generically.
    if($stateParams._id)//update
    {
        q = new Parse.Query(Ad)
        q.equalTo("objectId", $stateParams._id)
        q.include("productPointer")
        Ad.get({_id: $stateParams._id, $populate:"productPointer"}).then({success:function(elem){
                $scope.$apply(function(){
                    $scope.ad = elem
                    console.log(elem)
                    $scope.ad.productName = $scope.ad.productPointer.name// to render to the user.
                    console.log($scope.ad)

                })
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }}
        )

    }
    else//create
    {
        $timeout(function() {
        $scope.$apply(function() {
            $scope.ad = new Ad();
            console.log($scope.ad)
        })})
    }
    var productObject = Parse.Object.extend("Product");

    //don't call it createAd in the function. seems like initialize, not persist to DB
    $scope.persistAd = function() {
        //JOHN: productId isn't defined. how about querying the Product Table to see if the name lines up?
        var q = new Parse.Query(productObject)
        console.log($scope.ad.imagedata);
        //$scope.ad.attributes.image= new Parse.File("photo.png", $scope.ad.imagedata)
        Product.query({name: $scope.ad.productName}).then({success:function(elems){
            $scope.$apply(function(){
                console.log(elems)

                if (elems.length==0) {//no such element?


                    var product = new Product();
                    //default price right?
                    product.name = $scope.ad.productName
                    product.weightedPriceAverage = $scope.ad.attributes.price//Is this what we should do? seems iffy to base the weighted average on the first posting
                    //I guess future modifications will be based on cloud code or something.
                    product.$save().then(
                        function(response) {
                            console.log($scope.ad)
                            $scope.ad.attributes.productPointer = product;
                            console.log($scope.ad)
                            $scope.persistAdParse();
                        },
                        function(error) {
                            alert("Error: " + error.code + " " + error.message);
                            // The save failed.
                            // error is a Parse.Error with an error code and message.
                        }
                    );
                } else {
                    $scope.ad.productPointer = elems[0];
                    console.log($scope.ad)
                    $scope.persistAdParse();
                }
            })//Always reset the product anew on edit.

        },error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
            persistAdParse();
        }})


 }
    $scope.persistAdParse = function() {
        console.log($scope.ad)
        // Create a new instance of that class.
        $scope.ad.userPointer = //HOW ARE WE DOING THIS?
        console.log($scope.ad)
        delete $scope.ad.productName;
        $scope.ad.$save().$promise.then(
        function(ad) {
                console.log($scope.ad)
               $state.go("viewListing",{_id: $scope.ad._id})
            }, function (user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
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

            var parseFile = new Parse.File(name, files[0]);
            parseFile.$save().then(function() {
                // The file has been saved to Parse.
                $scope.ad.attributes.image = parseFile;
            }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
            });

        }
    }


})