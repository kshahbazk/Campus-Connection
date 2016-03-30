/**
 * Created by johnfranklin on 3/29/16.
 */
var express = require('express');
var router = express.Router();
var OperationHelper = require('apac').OperationHelper
var util = require('util')
var weightindex = [20,10,10,10,40];

var opHelper = new OperationHelper({
        awsId:     'AKIAIAV3Q75D4WH4TMBA',
        awsSecret: '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',
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
    if (x.OfferSummary && x.OfferSummary[0].LowestNewPrice && x.OfferSummary[0].LowestNewPrice[0].Amount) {//no prices for the product
        Product.find({name: x.ItemAttributes[0].Title[0]}).exec(function(err, elems) {
            //console.log("In product loop!")
            if (elems.length <= 0) {///product doesn't exist
                var p = new Product();
                p.name = x.ItemAttributes[0].Title[0];
                p.save();
                console.log("Didn't have element: " + x.ItemAttributes[0].Title[0])
            }


            var topPrice = x.OfferSummary[0].LowestNewPrice[0].Amount[0] / 100;
            if(x.OfferSummary[0].LowestUsedPrice)
                var delta = (topPrice - x.OfferSummary[0].LowestUsedPrice[0].Amount[0] / 100)/4;
            else
                var delta = 0;
            for (var i = 0; i < 5; i++) {
                // With this we have a product name and a New and Used price. We can set these for all Universities.
                var ppv = new PpvCache();
                ppv.productName = x.ItemAttributes[0].Title[0];
                ppv.location = location// only for the university of the missed PpvCache. more scalable as we add universities?
                ppv.quality = i + 1;
                ppv.weight = weightindex[i];
                ppv.ppv = topPrice - (4 - i) * delta;
                if(quality == ppv.quality)
                    res.json(ppv);
                //console.log(ppv)
                ppv.save(function(err, elem)
                {
                    console.log("done");
                });


            }

        })
    }
    else{
        console.log(x.ItemAttributes[0].Title[0]);
    }

}
router.get('/amazonLookup/:text',function(req, res, next) {
        opHelper.execute('ItemSearch', {//would be really nice to do this on the frontend, but it can't happen.
            'SearchIndex': 'All',// This can't really happen on backend either. Api limits are gonna be a big problem. This will call the same call over and over as they type in letters for the product they are selling.
            'Keywords': req.params.text,
            'ResponseGroup': 'ItemAttributes',
            ItemPage: 1
        }, function (err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js
            //Array of all items from the search.

            var titles = results.ItemSearchResponse.Items[0]
            for(var i = 0; i < titles.length; i++)
            {
                titles[i] = titles[i].ItemAttributes[0].Title[0];
            }
            res.json(titles);//send an array of all titles.
        });
    })
router.get('/getPPV',function(req, res, next) {
    PpvCache.findOne(req.query,function(err, elem){
        if(!elem)
        {
            opHelper.execute('ItemSearch', {
                'SearchIndex': 'All',
                'Keywords': req.params.productName,
                'ResponseGroup': 'ItemAttributes,Offers',
                ItemPage: 1
            },
            function(err, results)
            {
                var x = results.ItemSearchResponse.Items[0];
                populateFromAmazon(x.Item[0], req.params.location, res, req.params.quality)
            })
        }
        else{
            res.json(elem)
        }
    })

})
module.exports = router;