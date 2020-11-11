const connection = require('./config');
const {Sequelize} = require('sequelize');
const Comment = require('./comment');
const reaction = require('./reaction')
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

db.comment = Comment(sequelize, Sequelize);
db.reaction = reaction(sequelize,Sequelize);
db.share = share(sequelize, Sequelize);
db.news = news(sequelize, Sequelize);
db.post = post(sequelize, Sequelize);
db.user= User(sequelize,Sequelize);
db.sub= Sub(sequelize,Sequelize);

db.user.hasOne(db.sub);
db.user.hasMany(db.comment);
db.user.hasMany(db.share);
db.reaction.belongsTo(db.user);
db.news.hasMany(db.post);
db.post.hasMany(db.reaction);
db.post.hasMany(db.comment);
db.post.hasMany(db.share);


module.exports = db;
