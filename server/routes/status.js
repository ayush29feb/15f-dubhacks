var express = require('express');
var router = express.Router();
//var Statuses = require('../models/status');
//var User = require('../models/index');
var S = require('sequelize');
var sequelize = new S('postgres://postgres:asdfasdf@localhost:5432/lift');
var Statuses = require('../models/Status');
router.get('/', function(req, res, next){
 var id = req.user; 
  sequelize.query('SELECT users.name, users.profile_url,  statuses.* FROM users, statuses WHERE statuses.user_id = users.id AND statuses.user_id IN ((SELECT u1 AS id FROM connections where u2 = \''+  id +' \' AND status = \'confirmed\') UNION (SELECT u2 AS id FROM connections WHERE u1 = \''+  id +'\' AND status = \'confirmed\'));', { type : sequelize.QueryTypes.SELECT  })

  .then(function(post){ 
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
//Statuses.findAll({
//    where: {
//      user_id: {
//        in: User.getFriends(User.id)
//      }
//      at: {
//        gt: new Date().now()/1000 - 604800      
//     }
//    }	
//  })
//    .then(function(post){
//      res.send(post)  
//    })
	
});
module.exports = router;
