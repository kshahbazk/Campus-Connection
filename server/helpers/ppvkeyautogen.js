/**
 * Created by johnfranklin on 5/12/16.
 */
var db = require('../config/mongoose');
var ppv = require("../models/ppvcache")
process = require("process")
ppv.find({}, function(err, elems){
    console.log(err);
    console.log(elems.length);
    for(var i = 0; i < elems.length; i++){
            elems[i].ppvkey = elems[i]._id.toString()
            elems[i].save();
        }
    console.log("DONE")
    process.exit()
})
console.log("BREATHING")