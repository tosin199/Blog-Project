const connection = require('./config');
const {Sequelize} = require('sequelize');
const reaction = require('./reaction')

const sequelize = new Sequelize(connection.db, connection.user, connection.password, {
    host:connection.host,
    dialect:connection.dialect
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.reaction = reaction(sequelize,Sequelize);

module.exports = db;
