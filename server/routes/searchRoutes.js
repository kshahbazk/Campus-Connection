/**
 * Created by mtbsickrider on 4/30/16.
 */
var express = require('express');
var db = require('mongoose');

var _ = require("lodash");

var Ad = require("../models/ad");

var router = express.Router();

router.get('/', function(req,res) {
	var searchString = req.query.search;
	var searchArray = searchString.split(" ");
	console.log(searchArray);
	Ad.find({searchArray: {$in: searchArray}},null, {sort: { createdAt: -1}}, function(err, ads) {
		if (err) {
			console.log(err)
			return err;
		}
		console.log(ads);
		res.status(200).json(ads);
	});
});

module.exports = router;