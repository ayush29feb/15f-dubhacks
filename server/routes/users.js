var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');
var User = require('../models/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
	var newId = 5; //req.user.id
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
		res.send("Hello! You are creating something");
	})
	.post(function(req,res,next) {

	});
module.exports = router;
