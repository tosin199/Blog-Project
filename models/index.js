const connection = require('./config');
const {Sequelize} = require('sequelize');
const Comment = require('./comment');

const sequelize = new Sequelize(connection.db, connection.user, connection.password, {
    host:connection.host,
    dialect:connection.dialect
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.comment = Comment(sequelize, Sequelize);

module.exports = db;
