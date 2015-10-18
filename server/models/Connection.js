var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:asdfasdf@localhost:5432/lift');

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
Connection.sync({});
