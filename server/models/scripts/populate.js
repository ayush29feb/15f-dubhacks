var User = require('../User');
var Connection = require('../Connection');
var Status = require('../Status');

User.sync({force: true}).then(function() {
    User.create({ id: '1', name: 'Ayush'});
    User.create({ id: '2', name: 'Vardhman'});
    User.create({ id: '3', name: 'Divye'});
});

Connection.sync({force: true}).then(function() {
    Connection.create({ u1: '2', u2: '1', status: 'confirmed'});
    Connection.create({ u1: '1', u2: '3', status: 'confirmed'});
    Connection.create({ u1: '2', u2: '3', status: 'pending'});
});

Status.sync({force: true}).then(function() {
    Status.create({ userId: '1', data: '"{[]}'});
});
