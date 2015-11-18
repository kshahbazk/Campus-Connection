
angular.module('MyApp').controller('createAd', function($scope, $state, $stateParams){
    //Variables $scope.createAd needs to be initialized
    if(!Parse.User.current())
        $state.go("login")//Should we have a redirect?
    var Ad = Parse.Object.extend("Ad")
    //Hm. noticing a lot of repetition here.
    //I may move some of the common behaviors in profile out to services that function generically.
    if($stateParams._id)//update
    {
        q = new Parse.Query(Ad)
        q.equals("ObjectId", $stateParams._id)
        q.include("productPointer")
        q.first({success:function(elem){
                $scope.$apply(function(){
                    $scope.ad = elem
                    $scope.ad.attributes.productName= $scope.ad.attributes.productPointer.attributes.name// to render to the user.
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
        $scope.ad = new Ad()
        $scope.ad.attributes.image = new Parse.File("photo.png")//What are we doing for names?
        console.log($scope.ad)
    }
    var productObject = Parse.Object.extend("Product");

    //don't call it createAd in the function. seems like initialize, not persist to DB
    $scope.persistAd = function() {
        //JOHN: productId isn't defined. how about querying the Product Table to see if the name lines up?
        var q = new Parse.Query(productObject)

        q.equalTo("name",$scope.ad.attributes.productName)
        //if User is Creating a new product need to add it to the table first
        q.limit(1)
        q.find({success:function(elems){
            $scope.$apply(function(){
                console.log(elems)

                if (elems.length==0) {//no such element?


                    var product = new productObject();
                    //default price right?
                    product.attributes.name = $scope.ad.attributes.productName
                    product.attributes.weightedPriceAverage = $scope.ad.price//Is this what we should do? seems iffy to base the weighted average on the first posting
                    //I guess future modifications will be based on cloud code or something.
                    product.save(product, {
                        success: function(newProduct) {
                            $scope.ad.attributes.productPointer = newProduct;
                            console.log($scope.ad)
                            $scope.persistAdParse();
                        },
                        error: function(product, error) {
                            alert("Error: " + error.code + " " + error.message);
                            // The save failed.
                            // error is a Parse.Error with an error code and message.
                        }
                    });
                } else {
                    $scope.ad.attributes.productPointer = elems[0]
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
        // Create a new instance of that class.
        $scope.ad.attributes.userPointer = Parse.User.current();
        if($scope.ad.attributes.image.data)
            $scope.ad.attributes.image.save({
            success: function()
            {
                $scope.ad.save($scope.ad,
                    {
                        success: function(ad) {
                            $state.go("viewAd",{_id: $scope.ad.id})
                        },
                        error: function (user, error) {
                            // Show the error message somewhere and let the user try again.
                            alert("Error: " + error.code + " " + error.message);
                        }
                    });
            }
        })
        else
        {
            $scope.ad.attributes.image = null;
            $scope.ad.save(
                {
                    success: function(ad) {
                        $state.go("viewAd",{_id: $scope.ad.id})
                    },
                    error: function (user, error) {
                        // Show the error message somewhere and let the user try again.
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
        }
        //In the future, we might have a search bar that includes the different options. not there right now, so...


    }


    function saveFile(file) {
        if (file) {
            var name = "photo.png";

            var parseFile = new Parse.File(name, file);

            //put this inside if {
            parseFile.save().then(function() {
                // The file has been saved to Parse.
                $scope.ad.attributes.image = parseFile;
            }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
            });

        }
    }


})