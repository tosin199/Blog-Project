const connection = require('./config');
const {Sequelize} = require('sequelize');

const model = require('./models');
const { user } = require('./config');

const sequelize = new Sequelize(connection.db, connection.user, connection.password, {
    host:connection.host,
    dialect:connection.dialect,
    port: connection.port
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Model = new model(sequelize,Sequelize); 

db.comment = Model.comment();
db.reaction = Model.reaction();
db.share = Model.share();
db.category = Model.category();
db.post = Model.post();
db.user= Model.User();
db.sub=Model.Sub();

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

//category relationship
db.category.hasMany(db.post);
db.post.belongsTo(db.category);

//post relationship
db.post.hasMany(db.reaction);
db.reaction.belongsTo(db.post)

db.post.hasMany(db.comment);
db.comment.belongsTo(db.post);

db.post.hasMany(db.share);
db.share.belongsTo(db.post)


module.exports = db;
