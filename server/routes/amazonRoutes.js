/**
 * Created by johnfranklin on 3/29/16.
 */
var express = require('express');
var router = express.Router();
var OperationHelper = require('apac').OperationHelper
var util = require('util')
var weightindex = [20,10,10,10,40];
var process = require("process");
var opHelper = new OperationHelper({
        awsId:     process.env.AWSAccessKeyId,
        awsSecret: process.env.AWSSecretKey,
        assocId:   'campusco0e9-20',
        // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options)
        version:   '2013-08-01'
    }
)
var Product = require('../models/product')
//console.log(util.inspect(Product, {showHidden: false, depth: null}));
var PpvCache = require('../models/ppvcache')
var populateFromAmazon = function(x, location,res, quality)
{
    console.log("in outer function")
    if (x.OfferSummary && x.OfferSummary[0].LowestNewPrice && x.OfferSummary[0].LowestNewPrice[0].Amount) {//no prices for the product
        Product.find({name: x.ItemAttributes[0].Title[0]}).exec(function(err, elems) {
            //console.log("In product loop!")
            if (elems.length <= 0) {///product doesn't exist. possible to exist and want execution(current university doesn't have this product)
                var p = new Product();
                p.name = x.ItemAttributes[0].Title[0];
                p.category =
                p.save();
                console.log("Didn't have element: " + x.ItemAttributes[0].Title[0])
            }
        })

        var topPrice = x.OfferSummary[0].LowestNewPrice[0].Amount[0] / 100;
        if(x.OfferSummary[0].LowestUsedPrice)
            var delta = (topPrice - x.OfferSummary[0].LowestUsedPrice[0].Amount[0] / 100)/4;
        else
            var delta = 0;
        for (var i = 0; i < 5; i++) {
            // With this we have a product name and a New and Used price. We can set these for all Universities.
            var ppv = new PpvCache();
            var cur = (quality - 1 + i) % 5;
            ppv.productName = x.ItemAttributes[0].Title[0];
            ppv.location = location// only for the university of the missed PpvCache. more scalable as we add universities?
            ppv.quality = cur + 1;
            ppv.weight = weightindex[cur];
            ppv.ppv = topPrice - cur * delta;
            console.log("In callback in outer function")
            if(quality == ppv.quality)// always on the first execution
            {
                console.log("Success?")
                res.json(ppv);
            }
            //console.log(ppv)
            ppv.save(function(err, elem)
            {
                console.log("done");
            });


        }
    }
    else{
        console.log(x.ItemAttributes[0].Title[0]);
    }

}
router.get('/amazonLookup/:text',function(req, res, next) {
    var amazonQuery = {
        'ResponseGroup': 'ItemAttributes',
        'ItemPage': 1
    }
    if(req.query.category) {
        amazonQuery.SearchIndex = req.query.category;
        amazonQuery.Title = req.params.text
    }
    else
    {
        amazonQuery.SearchIndex = 'Blended';
        amazonQuery.Keywords = req.params.text
    }
    opHelper.execute('ItemSearch', amazonQuery, function (err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js
            //Array of all items from the search.
            if(results.ItemSearchResponse) {
                //console.log(util.inspect(results, {showHidden: false, depth: null}));
                var titles = results.ItemSearchResponse.Items[0].Item
                if (titles) {
                    for (var i = 0; i < titles.length; i++) {
                        titles[i] = titles[i].ItemAttributes[0].Title[0];
                    }
                    res.json(titles);//send an array of all titles.
                }
                else {
                    console.log(util.inspect(titles, {showHidden: false, depth: null}));
                    res.json([]);
                }
            }
            else//???
                console.log(util.inspect(results, {showHidden: false, depth: null}))
        });
    })
router.get('/getPPV',function(req, res, next) {
    console.log(req.body)
    console.log(req.query)
    //gonna be req.body and not params here because
    PpvCache.findOne(req.query,function(err, elem){
        console.log("in inner callback")
        if(!elem)
        {
            opHelper.execute('ItemSearch', {
                'SearchIndex': 'Blended',
                'Keywords': req.query.productName,
                'ResponseGroup': 'ItemAttributes,Offers',
                'ItemPage': 1
            },
            function(err, results)
            {
                if(results.ItemSearchResponse && results.ItemSearchResponse.Items && results.ItemSearchResponse.Items[0].Item) {
                    var x = results.ItemSearchResponse.Items[0];
                    populateFromAmazon(x.Item[0], req.query.location, res, req.query.quality)
                }
                else{
                    console.log(util.inspect(results, {showHidden: false, depth: null}))
                    console.log(util.inspect(results.Items, {showHidden: false, depth: null}))
                }
            })
        }
        else{

            res.json(elem)
        }
    })

})
module.exports = router;
