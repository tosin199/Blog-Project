const connection = require('./config');
const {Sequelize} = require('sequelize');

const model = require('./models');

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
db.postImage=Model.postImages();
db.categorySubscribed = Model.categorySubScribed();
db.commentReaction = Model.commentReaction();
db.commentReply = Model.commentReply();
db.commentReplyReaction = Model.commentReplyReaction();
db.isLoggedOut = Model.isLoggedOut();
db.resetPasswordCode = Model.resetPasswordCode();

//subscription relationship
db.user.hasOne(db.sub);
db.sub.belongsTo(db.user);

//comment relationship
db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);

//share relationship
db.user.hasMany(db.share);
db.share.belongsTo(db.user);

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
db.share.belongsTo(db.post);

db.post.hasMany(db.postImage);
db.postImage.belongsTo(db.post);

//subs relationship
db.sub.hasMany(db.categorySubscribed);
db.categorySubscribed.belongsTo(db.sub);

db.category.hasMany(db.categorySubscribed);
db.categorySubscribed.belongsTo(db.category);

//comment relationships
db.commentReply.belongsTo(db.user);
db.user.hasMany(db.commentReply);

db.commentReaction.belongsTo(db.user);
db.user.hasOne(db.commentReaction);

db.commentReplyReaction.belongsTo(db.user);
db.user.hasOne(db.commentReplyReaction);

db.commentReply.belongsTo(db.comment);
db.comment.hasMany(db.commentReply);

db.commentReaction.belongsTo(db.comment);
db.comment.hasMany(db.commentReaction);

db.commentReplyReaction.belongsTo(db.commentReply);
db.commentReply.hasMany(db.commentReplyReaction);
//loggout relationship
db.user.hasOne(db.isLoggedOut);
db.isLoggedOut.belongsTo(db.user);

//reset code and user relationship
db.user.hasOne(db.resetPasswordCode);
db.resetPasswordCode.belongsTo(db.user);


module.exports = db;
