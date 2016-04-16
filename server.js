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
};
conditionalRenderWholeDir = function(res, url,data){
	var temp = url.slice(url.lastIndexOf("/"))
	//console.log(directory);
	console.log(url);
	if(temp == "js" || temp == "css")//the file extension; prevents files from loading index.ejs instead of the javascript files
		res.sendFile(url, data)

	else
		res.render('index.ejs', data);
};

app.get('/', function(req,res){
    res.redirect(200, "LandingPage");
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
	names = {models:modelNames};

});
app.get('*', function (req,res) {
	conditionalRenderWholeDir(res, req.params[0],names);
});
var server = app.listen(80, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
