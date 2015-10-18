var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');

var Status = sequelize.define('status', {
    id : {
	type: Sequelize.UUID,
	field: 'id',
	primaryKey : true
    },
    userId : {
	type: Sequelize.STRING,
	field: 'user_id',
	references : {
	    model : User,
	    key : 'id'
	},
        allowNull : false
    },
    data : {
    	type: Sequelize.JSON,
	field: 'data',
	allowNull : false
    }
});

Status.sync({});
