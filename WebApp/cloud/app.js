
// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();
try {//Try catch block here makes behavior on server and locally the same! no more commenting and uncommenting.
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
}
catch(e)//Only used locally. no impact to performance this way
{
    bodyParser = require('body-parser');
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
}

// Global app configuration section
  // Specify the folder to find templates
app.set('views', 'cloud/views');
app.set('view engine', 'ejs');    // Set the template engine

//make sure to include these routes before the call with /*; it will lock out the other routes.
//you don't need any special format for the ejs. it all goes through because local as an object has everything put into the brackets.
app.get('/registration', function(req, res) {
    res.render('index.ejs', { data: 'Congrats, you just set up your app!2'});
});
app.get('/*', function(req, res) {
    res.render('index.ejs');
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
