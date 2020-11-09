const connection = require('./config');
const {Sequelize} = require('sequelize');
const share = require('./share.models')
const sequelize = new Sequelize(connection.db, connection.user, connection.password, {
    host:connection.host,
    dialect:connection.dialect
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.share = share(sequelize, Sequelize);

module.exports = db;
