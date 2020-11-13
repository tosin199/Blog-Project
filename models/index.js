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

//subscription relationship
db.user.hasOne(db.sub);
db.sub.belongsTo(db.user);

//comment relationship
db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);

//share relationship
db.user.hasMany(db.share);
db.share.belongsTo(db.user);
// async function getComment(req,res){
//     const comment = await models.comment.findAll({include:[models.user]});
//     res.json(comment);
// }// async function getComment(req,res){
//     const comment = await models.comment.findAll({include:[models.user]});
//     res.json(comment);
// }
// reaction relationship
db.reaction.belongsTo(db.user);
db.user.hasOne(db.reaction)

//news relationship
db.news.hasMany(db.post);
db.post.belongsTo(db.news);

//post relationship
db.post.hasMany(db.reaction);
db.reaction.belongsTo(db.post)

db.post.hasMany(db.comment);
db.comment.belongsTo(db.post);

db.post.hasMany(db.share);
db.share.belongsTo(db.post)


module.exports = db;
