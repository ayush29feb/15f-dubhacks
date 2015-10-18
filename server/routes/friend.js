var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');
var User = require('../models/User');
var Status = require('../models/Status');
var Connection = require('../models/Connection');

router.put('/:friend_id/request', function(req,res,next) {
	var myId = req.user;
	var otherId = req.params.friend_id;
	console.log(otherId);
	sequelize.query("UPDATE connections SET u2 = \'" + myId  + "\', u1 = \'" + otherId + "\', status = 'pending' WHERE (u1 = \'" + myId  + "\' AND u2 = \'" + otherId + "\') OR (u2 = \'" + myId  + "\' AND u1 =\'" + otherId + "\')", {type: sequelize.QueryTypes.UPDATE}).then(function(connection){
		res.send(connection);
	});
});

router.put('/:friend_id/accept',function(req,res,next) {
	var myId = req.user;
	var otherId = req.params.friend_id;
	console.log(otherId);
	sequelize.query("UPDATE connections SET status = 'confirmed' WHERE u2 = \'"+ myId +"\' AND u1 = \'"+otherId+"\' AND status = 'pending'", {type: sequelize.QueryTypes.UPDATE})

	.then(function(connection) {
		res.send(connection);
	});

	
});

module.exports = router;
