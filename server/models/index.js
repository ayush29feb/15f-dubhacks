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

