
angular.module('MyApp').controller('createAd', function(){
    //Variables $scope.createAd needs to be initialized



 this.createAd = function() {

     //if User is Creating a new product need to add it to the table first
     if (!$scope.ad.attributes.productId) {
         var productObject = Parse.Object.extend("Product");

         var product = new productObject();

         product.save({
             name: this.product.name
         }, {
             success: function(newProduct) {
                 $scope.ad.attributes.productId = newProduct.id;
                 createAdParse();
             },
             error: function(product, error) {
                 // The save failed.
                 // error is a Parse.Error with an error code and message.
             }
         });
     } else {
         createAdParse();
     }

 }
    function createAdParse() {
        // Create a new instance of that class.


        $scope.ad.save(
            $scope.ad
        , {
            success: function(ad) {

            },
            error: function(ad, error) {
                // The save failed.
                // error is a Parse.Error with an error code and message.
            }
        });

    }

    function saveFile(file) {
        if (file) {
            var file = fileUploadControl.files[0];
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