var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');
var User = require('../models/User');
var Status = require('../models/Status');
var Connection = require('../models/Connection');

router.get('/', function(req,res,next) {
console.log(req);
//get the friends of the user
	var myId = req.user;
	sequelize.query("SELECT * from users WHERE users.id IN ((SELECT u1 as id FROM connections where u2 = \'"+myId+"\') UNION (SELECT u2 as id FROM connections WHERE u1 = \'"+myId+"\'))", { type : sequelize.QueryTypes.SELECT }).then(function(friends) {
		res.send(friends);
	});
});

module.exports = router;
