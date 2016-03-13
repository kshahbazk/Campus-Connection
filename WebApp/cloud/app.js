
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}))

var modelNames=[];
var fs = require("fs");
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
fs.readdir('cloud/models',function(err,files){//files is a string array of the names of the files(??)
    if(err) throw err;
    files.forEach(function(file){
        //
        var name = file.slice(0, file.length - 3)//removes .js
        modelNames.push(name.capitalize());
    });
});
var dbRoutes = require(__dirname + '/routes/dbRoutes');
app.use("/api", dbRoutes);
var userRoutes = require(__dirname + '/routes/userRoutes');
app.use("/user", userRoutes);
var User = mongoose.model('User');

app.use(passport.initialize());
passport.use(new LocalStrategy(
	function(username,password, done) {
		User.findOne({username:username}).exec(function(err, user) {
			if(user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
	}
));

passport.serializeUser(function(user, done) {
	if(user) {
		done(null, user._id);
	}
});

passport.deserializeUser(function(id, done){
	User.findOne({_id:id}).exec(function(err, user) {
		if(user) {
			return done(null, user )
		} else {
			return done(null, false);
		}
	})
});


// Global app configuration section
  // Specify the folder to find templates
app.set('views', 'cloud');//Screw it. no more confusing views folder in cloud.
app.set('view engine', 'ejs');    // Set the template engine
//make sure to include these routes before the call with /*; it will lock out the other routes.
//you don't need any special format for the ejs. it all goes through because local as an object has everything put into the brackets.


conditionalRender = function(res,directory,filetoreturn,data){
    var temp = filetoreturn.split('.').pop();
    //console.log(directory);
    console.log(filetoreturn);
    if(filetoreturn=="modelNameList")
    {
        res.json(modelNames);
    }
    else if(temp == "js" || temp == "css")//the file extension; prevents files from loading index.ejs instead of the javascript files
        res.sendFile(directory+"/"+filetoreturn, data)
    else
        res.render('index.ejs', data);
}
app.get('/', function(req,res){
    res.redirect("LandingPage");
})


/*
These calls prevent the server from retrieving index.ejs when it wants a javascript or a css file.
Need a better solution.
 */

//TODO:use wildcard for routes

app.get('/:dir1/:dir2/:dir3/:file', function(req, res) {
    conditionalRender(res,req.params.dir1+"/"+req.params.dir2+"/"+req.params.dir3, req.params.file, {})
});
app.get('/:dir1/:dir2/:file', function(req, res) {
    conditionalRender(res,req.params.dir1+"/"+req.params.dir2, req.params.file, {})
});
app.get('/:dir1/:file', function(req, res) {
    conditionalRender(res,req.params.dir1, req.params.file, {})
});
app.get('/:file', function(req, res) {
    conditionalRender(res,"", req.params.file, {})
});

console.log("all good");
app.listen(8080);

