/**
 * Created by johnfranklin on 11/9/15.
 */

var express = require('express');
var db = require('mongoose');

var dbmodels = {};
var fs = require('fs');
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
//Attempting to genericize previously generic database. TESTTESTTEST
fs.readdir('server/models',function(err,files){//files is a string array of the names of the files(??)
    if(err) throw err;
    files.forEach(function(file){
        //
        var name = file.slice(0, file.length - 3)//removes .js
        try
        {
            dbmodels[name.capitalize()] = db.model(name.capitalize());
        }
        catch(e) {
            dbmodels[name.capitalize()] = require('../models/'+name);
        }

    });
		console.log(dbmodels);
});

var dbRouter = express.Router();
//dbRouter.dbmodels = dbmodels;
var retrieveModel = function(modelName, body)
{
    if(dbmodels.hasOwnProperty(modelName.capitalize()))
        return dbmodels[modelName.capitalize()];
    return null // model not found
}


var viewPermissions = function(objOfQuery, ownerId)
{
    objOfQuery.$or = [{viewableIds: {$exists: false}}, {viewableIds: ownerId}];
    return objOfQuery
}

/**
 * adds elements to the object used by a query to establish write permissions.
 * @param objOfQuery
 * @param ownerId
 */
var writePermissions = function(objOfQuery, ownerId)
{
    objOfQuery.ownerId = ownerId;
    //objOfQuery.$or = [{modifiable: {$exists: false}}, {modifiable : true}];//Handle internal to job object; only object to lock
    //May just have to mock the behavior? UGH!!
    //No time to implement subdocument permissions for modification.
    return objOfQuery;
}
dbRouter.get("/:_model", function(req,res, next){
    //console.log("Email: " + req.query);
    //console.log(req.params._model);
    var ret_model = retrieveModel(req.params._model);
    if(ret_model == null)
    {
        res.json(201, {error : "Invalid Request"});
        return;
    }
    job = new ret_model(req.body);
    //console.log(req.query)
    for(property in req.query){//for each property of the query
        if(req.query[property] instanceof Array || req.query[property].charAt(0) == '{') {//primary issue. no need for syntax errors otherwise
            try {

                temp = JSON.parse(req.query[property]);//set it to an object version of the string passed.
                req.query[property] = temp;
            }
            catch (e) {//this property not an object
                console.log(e);
            }
        }

    }
    var toPopulate;
    if(req.query.$populate)//String
    {
        toPopulate = req.query.$populate;
        delete req.query.$populate
    }
    var toSort;
    if(req.query.$sort)//String
    {
        toSort = req.query.$sort;
        delete req.query.$sort;
    }
    var toLimit;
    if(req.query.$limit)//String
    {
        toLimit = parseInt(req.query.$limit);
        delete req.query.$limit;
        if(toLimit == NaN)//?? something went wrong
            delete toLimit;
    }
    var query = ret_model.find(req.query)
    if(toPopulate)
        query = query.populate(toPopulate)//Keep it a single string.
    if(toSort)
        query = query.sort(toSort)//Keep it a single string.
    if(toLimit)
        query = query.limit(toLimit)//Keep it a single string.
    query.exec(function(err, elements){
        if(err){
            console.log(err);
        };
        //console.log(elements);
        res.json(elements);
    });
});
dbRouter.get("/:_model/:_id", function(req,res, next){
//console.log("Id: " + req.params._id);

var ret_model = retrieveModel(req.params._model);
if(ret_model == null)
{
    res.json(201, {error : "Invalid Request"});
    return;
}
    var toPopulate;
    if(req.query.$populate)//String
    {
        toPopulate = req.query.$populate;
        delete req.query.$populate
    }
    //No sorting or limiting to do here, but it should behave as if these commands aren't there.
    if(req.query.$sort)//String
    {
        //toSort = req.query.$sort;
        delete req.query.$sort;
    }
    //var toLimit;
    if(req.query.$limit)//String
    {
        //toLimit = req.query.$limit;
        delete req.query.$limit;
    }
    var query = ret_model.findOne({_id : req.params._id})
    if(toPopulate)
        query = query.populate(toPopulate)//Keep it a single string.
    query.exec(function(err, element){
    if(err){
        console.log(err);
        return next(err);
    };
    //console.log(element);
    res.json(element);
})
});
dbRouter.post("/:_model", function(req,res, next){//Really want to include login req here, but need to handle User creation without being logged in.
    //console.log('Post Received.');
    //console.log(req);
    //console.log(req.body);
    //console.log(req.params._model);
    var ret_model = retrieveModel(req.params._model);
    if(ret_model == null)
    {
				//console.log("returned invalid request")
        return next({error : "Invalid Request"});
    }
    if(req.body.ownerId == null && req.user != null)//needed to resolve an issue with register
        req.body.ownerId = ""
    var job = new ret_model(req.body);
    //console.log(job);
    job.save(function(err, job){
        if(err){
            console.log(err);
            console.log(job);
            console.log("Job did not save correctly.");
            return next(err)
        };
        //console.log(job._id);
        res.json(200, job);
    })
});
dbRouter.put("/:_model/:_id", function(req,res,next){
    //console.log("In Put!")
    var ret_model = retrieveModel(req.params._model);
    //console.log(req.user.email);
    if(ret_model == null)
    {
        return next({error : "Invalid Request"});
    }
    ret_model.findOne({_id : req.params._id}, function(err, doc){
        if(doc) {
            for (property in req.body)
                doc[property] = req.body[property];
            //console.log(doc);
            doc.save();
            res.status(204).end();//needed for put callback
        }
        else{console.log("nothing returned for update")}
        console.log("In find callback!")
    });


});
dbRouter.put("/:_model/", function(req,res, next){
    //console.log("In Put!")
    var ret_model = retrieveModel(req.params._model);
    //console.log(req.user.email);
    if(ret_model == null)
    {
        return next({error : "Invalid Request"});
    }
    ret_model.update(req.query, req.body, function(err, numAffected){
        if(err){return next(err);}
        console.log("In Put callback!")
        res.status(204).end()//needed for put callback
    });

});
dbRouter.delete("/:_model/:_id", function(req,res,next){

    var ret_model = retrieveModel(req.params._model);
    if(ret_model == null)
    {
        return next({error : "Invalid Request"});
        return;
    }

    ret_model.remove({_id : req.params._id},function(err){
        if(err){return next(err);};
        res.status(204).end();//needed for delet callback
    })
});
module.exports = dbRouter;
