var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');
var User = require('../models/User');
var Status = require('../models/Status');
var Connection = require('../models/Connection');

router.put('/:friend_id/request', function(req,res,next) {
	var myId = "10208124438215509";
	var otherId = req.params.friend_id;
	console.log(otherId);
	sequelize.query("UPDATE connections SET u1 = \'" + myId  + "\', u2 = \'" + otherId + "\', status = 'pending' WHERE (u1 = \'" + myId  + "\' AND u2 = \'" + otherId + "\') OR (u2 = \'" + myId  + "\' AND u1 =\'" + otherId + "\')", {type: sequelize.QueryTypes.UPDATE}).then(function(connection){
		res.send(connection);
	});
});

router.put('/:friend_id/accept',function(req,res,next) {
	var myId = "10207124363294839";
	var otherId = req.params.friend_id;
	console.log(otherId);
	sequelize.query("UPDATE connections SET status = 'confirmed' WHERE u2 = \'"+ myId +"\' AND u1 = \'"+otherId+"\' AND status = 'pending'", {type: sequelize.QueryTypes.UPDATE})

	.then(function(connection) {
		res.send(connection);
	});

	
});

module.exports = router;
