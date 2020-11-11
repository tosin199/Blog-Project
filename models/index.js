const connection = require('./config');
const {Sequelize} = require('sequelize');
const share = require('./share.models');
const news = require('./news.models');
const post = require('./post.models');
const User = require('./user.model');

const Sub = require('./subscription.model');
const { user } = require('./config');

const sequelize = new Sequelize(connection.db, connection.user, connection.password, {
    host:connection.host,
    dialect:connection.dialect
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.share = share(sequelize, Sequelize);
db.news = news(sequelize, Sequelize);
db.post = post(sequelize, Sequelize);
// User.hasOne(Sub);

db.user= User(sequelize,Sequelize);
db.sub= Sub(sequelize,Sequelize);

db.user.hasOne(db.sub);




module.exports = db;
