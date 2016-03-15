/**
 * Created by johnfranklin on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
require("../models/file");
var file = mongoose.model('File');

router.get('/images/:_id',function(req, res, next){

    file.findOne(req.params,function(err, elem) {
        //console.log(elem)//Be careful with print statements. With such large files it will result in significant slowdown.
        if(elem) {
            res.writeHead('200', {'Content-Type': elem.fileType})
            res.end(elem.fileContent, elem.encoding)
        }
        else
            res.json({response: "??? how did you get here?"})
    })
})
module.exports = router;