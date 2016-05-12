/**
 * Created by johnfranklin on 5/12/16.
 */
var db = require('../config/mongoose');
var ppv = require("../models/ppvcache")
var ppvInstance = new ppv();
ppvInstance.weight= 50;
console.log(ppvInstance)
ppvInstance.save(function(){
    console.log(ppvInstance)
})
console.log(ppvInstance)