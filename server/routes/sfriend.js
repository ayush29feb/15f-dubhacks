var express = require('express');
var router = express.Router();
var S = require('sequelize');
var sequelize = new S('postgres://postgres:asdfasdf@localhost:5432/lift');
var Statuses = require('../models/Status');

router.get('/:friend_id', function(req, res, next){
	var id = req.params.friend_id;
	Statuses.findAll({
		where : {
			user_id: id
			}
		})
		.then(function(sfriend){
			res.send(sfriend);
		})
});
module.exports = router;


