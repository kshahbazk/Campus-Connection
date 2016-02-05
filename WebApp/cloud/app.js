
// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();
try {//Try catch block here makes behavior on server and locally the same! no more commenting and uncommenting.
    console.log("In Try")
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    console.log("Passed Try")
}

catch(e)//Only used locally. no impact to performance this way
{
    console.log("In Catch")
    bodyParser = require('body-parser');
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    console.log("Passed Catch")

}

// Global app configuration section
  // Specify the folder to find templates
app.set('views', 'cloud');//Screw it. no more confusing views folder in cloud.
app.set('view engine', 'ejs');    // Set the template engine

//make sure to include these routes before the call with /*; it will lock out the other routes.
//you don't need any special format for the ejs. it all goes through because local as an object has everything put into the brackets.
app.get('/register', function(req, res) {
    res.render('index.ejs', { data: 'Congrats, you just set up your app!'});
});

conditionalRender = function(res,directory,filetoreturn,data){
    var temp = filetoreturn.split('.').pop();
    console.log(directory);
    console.log(filetoreturn);
    if(temp == "js" || temp == "css")//the file extension; prevents files from loading index.ejs instead of the javascript files
        res.render(directory+"/"+filetoreturn, data)
    else
        res.render('index.ejs', data);
}
app.get('/', function(req,res){
    res.redirect("LandingPage");
})
/*
These calls prevent the server from retrieving index.ejs when it wants a javascript or a css file.
 */
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

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen(8080);
