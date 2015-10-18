var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');
var User = require('./User');

var Status = sequelize.define('status', {
    id : {
        type: Sequelize.UUID,
        primaryKey : true,
        defaultValue: Sequelize.UUIDV4
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
        allowNull : false
    }
});

module.exports = Status;
