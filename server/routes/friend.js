var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');
var User = require('../models/User');
var Status = require('../models/Status');
var Connection = require('../models/Connection');

router.get('/:friend_id/request', function(req,res,next) {
	var id = req.params.friend_id;
	sequelize.query("UPDATE connections SET f1 = \'myid\', f2 = \'otherId\', status = 'pending' WHERE (f1 = \'myId\' AND f2 = \'otherId\') OR (f2 = \'myid\' AND f1 =\'otherId\')", {type: sequelize.QueryTypes.SELECT}).then(function(connection){
		res.send(connection);
	});
});

module.exports = router;
