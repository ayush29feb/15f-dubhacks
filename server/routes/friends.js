var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');
var User = require('../models/User');
var Status = require('../models/Status');
var Connection = require('../models/Connection');

router.get('/connected', function(req,res,next) {
console.log(req);
//get the friends of the user
	var myId = req.user;
	sequelize.query("SELECT * from users WHERE users.id IN ((SELECT u1 as id FROM connections where u2 = \'"+myId+"\' AND status = 'confirmed') UNION (SELECT u2 as id FROM connections WHERE u1 = \'"+myId+"\' AND status = 'confirmed'))", { type : sequelize.QueryTypes.SELECT }).then(function(friends) {
		res.send(friends);
	});
});

router.get('/disconnected', function(req,res,next) {
console.log(req);
//get the friends of the user
	var myId = req.user;
	sequelize.query("SELECT * from users WHERE users.id IN ((SELECT u1 as id FROM connections where u2 = \'"+myId+"\' AND status = 'none') UNION (SELECT u2 as id FROM connections WHERE u1 = \'"+myId+"\' AND status = 'none' ))", { type : sequelize.QueryTypes.SELECT }).then(function(friends) {
		res.send(friends);
	});
});

router.get('/pending', function(req,res,next) {
console.log(req);
//get the friends of the user
	var myId = req.user;
	sequelize.query("SELECT * from users WHERE users.id IN ((SELECT u1 as id FROM connections where u2 = \'"+myId+"\' AND status = 'pending') UNION (SELECT u2 as id FROM connections WHERE u1 = \'"+myId+"\' AND status = 'pending'))", { type : sequelize.QueryTypes.SELECT }).then(function(friends) {
		res.send(friends);
	});
});



module.exports = router;
