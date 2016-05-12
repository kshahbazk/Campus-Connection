/**
 * Created by johnfranklin on 5/12/16.
 */
var db = require('../config/mongoose');
var ppv = require("../models/ppvcache")
ppv.find({}, function(err, elems){
    console.log(elems.length);
    for(var i = 0; i < elems.length; i++){
            elems[i].ppvkey = elems[i]._id.toString()
            elems[i].save();
        }
})
console.log("BREATHING")