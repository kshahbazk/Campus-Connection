/**
 * Created by johnfranklin on 3/29/16.
 */
/**
 * Script to add elements to the database's PPV cache based on amazon.
 * fill out the search terms to pull textbooks
 */

var util = require('util')
var db = require('../config/mongoose');
var Product = require('../models/product')
//console.log(util.inspect(Product, {showHidden: false, depth: null}));
var process = require("process")
var PpvCache = require('../models/ppvcache')
var weightindex = [20,10,10,10,40];
var uniarr = ["San Jose State University","Santa Clara University"]// would be replaced with a query to the university table when we expand.
var OperationHelper = require('apac').OperationHelper
var opHelper = new OperationHelper({
        awsId:     process.env.AWSAccessKeyId,
        awsSecret: process.env.AWSSecretKey,
        assocId:   'campusco0e9-20',
        // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options)
        version:   '2013-08-01'
    }
)
//
var populateFromAmazon = function(x)
{
    if (x.OfferSummary && x.OfferSummary[0].LowestNewPrice && x.OfferSummary[0].LowestNewPrice[0].Amount) {//no prices for the product
        Product.find({name: x.ItemAttributes[0].Title[0]}).exec(function(err, elems) {
            //console.log("In product loop!")
            if (elems.length <= 0) {///product doesn't exist
                var p = new Product();

                p.name = x.ItemAttributes[0].Title[0];
                console.log("Didn't have element: " + x.ItemAttributes[0].Title[0])
                p.save();
                var topPrice = x.OfferSummary[0].LowestNewPrice[0].Amount[0] / 100;
                if(x.OfferSummary[0].LowestUsedPrice)
                    var delta = (topPrice - x.OfferSummary[0].LowestUsedPrice[0].Amount[0] / 100)/4;
                else
                    var delta = 0;
                for (var j = 0; j < 2; j++) {
                    for (var i = 0; i < 5; i++) {
                        // With this we have a product name and a New and Used price. We can set these for all Universities.
                        var ppv = new PpvCache();
                        ppv.productName = x.ItemAttributes[0].Title[0];
                        ppv.location = uniarr[j];
                        ppv.quality = i + 1;
                        ppv.weight = weightindex[i];
                        ppv.ppv = topPrice - (4 - i) * delta;
                        console.log(ppv)
                        ppv.save(function(err, elem)
                        {
                            console.log("done");
                        });


                    }
                }
            }
            else
            {
                console.log("Had element: " + elems[0].name)
            }

        })
    }
    else{
        console.log(x.ItemAttributes[0].Title[0]);
    }

}

for(var j = 1; j <= 10; j++) {
    opHelper.execute('ItemSearch', {
        'SearchIndex': 'Electronics',
        'Keywords': 'laptop',
        'ResponseGroup': 'ItemAttributes,Offers',
        ItemPage: j
    }, function (err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js
        //Array of all items from the search.
        var x = results.ItemSearchResponse.Items[0];
        //console.log(util.inspect(x, {showHidden: false, depth: null}))
        for (var i = 0; i < x.Item.length; i++) {
            //console.log("Inputting...")
            populateFromAmazon(x.Item[i])

        }

    });
}
//What will amazon search do?
//They search for a product. It searches Amazon with Item Lookup, which will require talking with the backend because AWS api doesn't offer JSONP.
//They select an Item. It checks the backend to see if it has PPVCache element for the given product, sending out product name, rating and the University of the seller.
//  if it doesn't, responds with a new PPVCache element it will create with the right PPV and weight for the given request, then create the rest for the given university.
//  The backend creates a product element if it doesn't have it.
//  Backend looks at Amazon for that product.
// only for university of searcher. This way as we add universities we won't need to pull in the results of old products; can just let the system generate
//  Lowest New price inputted as the new price for the best quality, weight of x(highest because new products generally cost the same everywhere)
//  Lowest Used price inputted as the new price for the lowest quality given a weight of x/2
// values in between will be approximated by the ratio between the items, and given a much lower weight because they are approximations (x/4)
// Two routes: one which provides a list of values from Amazon based on what the user searches.
// one based on checking the PPVCache.