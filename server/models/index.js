var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');

var User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        field: 'id',
        primaryKey: true
    },
    profileUrl: {
        type: Sequelize.STRING(512),
        field: 'profile_url',
        allowNull: true,
    },
    name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
    }
});

var Status = sequelize.define('status', {
    id : {
	type: Sequelize.UUID,
	field: 'id',
	unique: true
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
    	type: Sequelize.JSONB,
	field: 'data',
	allowNull : false
    }
})

