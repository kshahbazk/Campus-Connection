var app = require('cloud/app.js');
var _ = require("cloud/npm/lodash/lodash");

Parse.Cloud.beforeSave("createAd", function(request, response) {
  var ad = request.object;

  var toLowerCase = function(w) { return w.toLowerCase(); };

  var words = ad.get("title").split(/b/);
  words = _.map(words, toLowerCase);



  post.set("searchArray", words);
  response.success();
});

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

