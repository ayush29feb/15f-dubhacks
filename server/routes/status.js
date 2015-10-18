var express = require('express');
var router = express.Router();
//var Statuses = require('../models/status');
//var User = require('../models/index');
var S = require('sequelize');
var sequelize = new S('postgres://postgres:asdfasdf@localhost:5432/lift');

router.get('/', function(req, res, next){
  
  sequelize.query('SELECT users.name, users.profile_url,  statuses.* FROM users, statuses WHERE users.id = statuses.user_id AND statuses.user_id IN ((SELECT u1 AS id FROM connections where u2 = \'1\' AND status = \'confirmed\') UNION (SELECT u2 AS id FROM connections WHERE u1 = \'1\' AND status = \'confirmed\'));', { type : sequelize.QueryTypes.SELECT  })

  .then(function(post){ 
    if (post.length == 0){
	res.send('Query requested is wrong')
    }
    else{
	res.send(post); 
    }
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
