var express = require('express');
var router = express.Router();
var S = require('sequelize');
var sequelize = new S('postgres://postgres:asdfasdf@localhost:5432/lift');
var Statuses = require('../models/Status');
router.get('/', function(req, res, next){
 var id = req.user; 
  sequelize.query('SELECT * FROM users AS u JOIN statuses AS s ON s.user_id = u.id WHERE u.id  IN ((SELECT u1 AS id FROM connections where u2 = \''+  id +'\' AND status = \'confirmed\') UNION (SELECT u2 AS id FROM connections WHERE u1 = \''+  id +'\' AND status = \'confirmed\'));', { type : sequelize.QueryTypes.SELECT  }).then(function(post){ 
	res.send(post); 
   });

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
	
});
module.exports = router;
