var express = require('express');
var serverHelper = require('./server/helpers/serverHelper');

var app = express();



require('./server/config/express')(app);
require('./server/config/mongoose');
require('./server/config/passport');
require('./server/config/routes')(app);


conditionalRender = function(res,directory,filetoreturn,data){
    var temp = filetoreturn.split('.').pop();
    //console.log(directory);
    console.log(filetoreturn);
    if(temp == "js" || temp == "css")//the file extension; prevents files from loading index.ejs instead of the javascript files
        res.sendFile(directory+"/"+filetoreturn, data)
    else
        res.render('index.ejs', data);
}

app.get('/', function(req,res){
    res.redirect("LandingPage");
});

/*
These calls prevent the server from retrieving index.ejs when it wants a javascript or a css file.
Need a better solution.
 */

//TODO:use wildcard for routes

var modelNames= [];
var names;
	serverHelper.getModelNames(function(Mn) {
	modelNames = Mn;
	console.log(modelNames);
	names = {models:modelNames};

});
app.get('/:dir1/:dir2/:dir3/:file', function(req, res) {
	conditionalRender(res,req.params.dir1+"/"+req.params.dir2+"/"+req.params.dir3, req.params.file, names)
});
app.get('/:dir1/:dir2/:file', function(req, res) {
	conditionalRender(res,req.params.dir1+"/"+req.params.dir2, req.params.file, names)
});
app.get('/:dir1/:file', function(req, res) {
	conditionalRender(res,req.params.dir1, req.params.file, names)
});
app.get('/:file', function(req, res) {
	conditionalRender(res,"", req.params.file, names)
});
var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

/* TODO: John loook at this code to improve on our routing, then move this to a routing file and use require :)

app.get('/partials/!*' , function(req,res){
	//Starts from views directory
	console.log(req.params[0]);
	res.render('../../public/app/' + req.params[0]); //differebt from video , was trying to get object, not stirng
});

app.get('*', function (req,res) {
	res.render('index');
});*/
