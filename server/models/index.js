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
        validate: {
            isUrl: true
        }
    },
    name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
    }
});

var Connection = sequelize.define('connection', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    u1: {
        type: Sequelize.STRING,
        references: {
            model: User,
            key: "id"
        }
    },
    u2: {
        type: Sequelize.STRING,
        references: {
            model: User,
            key: "id"
        }
    },
    status: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['pending', 'confirmed', 'none']]
        }
    }
});

User.sync({});
Connection.sync({});
