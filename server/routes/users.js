var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');
var User = require('../models/User');
var Status = require('../models/Status');
/* GET users listing. */
router.get('/', function(req, res, next) {
	var newId = req.user;
	User.findAll({
		where: {
			id: newId
		}
        }).then(function(user) {
		res.send(user);
	})
});

router.route('/create')
	.get(function(req,res,next) {
		res.send("Hello! You are on the creating endpoint. Please create an emotion");
	})
	.post(function(req,res,next) {
		var newId = req.user;
		console.log(req.body);
		var userEmotion = req.body.data;
		Status.create({userId: newId, data: userEmotion}).then(function(emotion) {
			res.send(emotion);
		});
	});
module.exports = router;
