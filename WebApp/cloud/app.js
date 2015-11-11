
// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();
bodyParser = require('body-parser');
// Global app configuration section
  // Specify the folder to find templates
app.set('views', 'cloud/views');
app.set('view engine', 'ejs');    // Set the template engine
app.use(
    bodyParser
    //express
        .json());//swap comments for parse deploy
app.use(
    bodyParser
    //express
        .urlencoded({extended: true}));// Middleware for reading request body
app.use(express.static('public')); // this will make the project work when not deployed from parse. comment before deploying
// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/*', function(req, res) {
    res.render('index.ejs', {data:{}});
});
app.get('/hello', function(req, res) {
  res.render('index.ejs', { message: 'Congrats, you just set up your app!' });
});//ns if this works. need to test
app.get('/profile', function(req, res) {
    res.render('index.ejs', { message: 'Congrats, you just set up your app!' });
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
