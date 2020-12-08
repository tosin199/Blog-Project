const models = require('../models/index');

async function getOneReaction(req,res){
    const reaction = await models.reaction.findAndCountAll(
        {where:{postId:req.params.id}},
        {include:[models.user]}
    );
    res.json(reaction);    
}
async function getLikes(req,res){
  const likes = await models.reaction.findAndCountAll(
    {
    where:{
        postId:req.params.id,
        reaction:1
        }
    },{
      include:[models.user]
	});
	res.json(likes);
};
async function getDislikes(req,res){
  const dislikes = await models.reaction.findAndCountAll(
    {
    where:{
        postId:req.params.id,
        reaction:0
        }
    },{
      include:[models.user]
	});
	res.json(dislikes);
}
async function createReaction(req,res){
    var reactions, msg;
    const attribute = req.params;
    const reactionExist = await models.reaction.findOne({
        where:{userId:req.user.id,postId:attribute.postId}
    });
    if (reactionExist){ 
        reactions = await models.reaction.update({
            reaction:true,userId:req.user.id,postId:attribute.postId
        },{where: {id:reactionExist.id}}
        );
        msg = 'updated like'

    } else {
        reactions = await models.reaction.create({
            reaction:true,userId:req.user.id,postId:attribute.postId}
        );
        msg = 'created like'
    
    }
    res.json(msg);
    
}
async function createCommentLikeReaction(req,res){
    var reactions, msg;
    const attribute = req.params;
    const reactionExist = await models.commentReaction.findOne({
        where:{userId:req.user.id,commentId:attribute.commentId}
    });
    if (reactionExist){ 
        reactions = await models.commentReaction.update({
            status:true,userId:req.user.id,commentId:attribute.commentId
        },{where: {commentId:attribute.commentId}}
        );
        msg = 'updated like'

    } else {
        reactions = await models.reaction.create({
            status:true,userId:req.user.id,commentId:attribute.commentId}
        );
        msg = 'created like'
    
    }
    res.json(msg)
}

async function createDislikeReaction(req,res){{order:['createdAt']}
    var reactions, msg;
    const attribute = req.params
    const dislikeReactionExist = await models.reaction.findOne({
        where:{userId:attribute.userId,postId:attribute.postId}})
    if (dislikeReactionExist){ 
        reactions = await models.reaction.update({
            reaction:false,userId:req.user.id,postId:attribute.postId
        },{where: {id:dislikeReactionExist.id}}
        );
        msg = 'updated dislike'
    
    } else {
        reactions = await models.reaction.create(
            {reaction:false,userId:req.user.id,postId:attribute.postId}
            );
        msg = 'created dislike';
    }
    res.json(msg);
    
}

async function createDislikeCommentReaction(req,res){
    var reactions, msg;
    const attribute = req.params
    const dislikeReactionExist = await models.commentReaction.findOne({
        where:{userId:attribute.userId,commentId:attribute.commentId}})
    if (dislikeReactionExist){ 
        reactions = await models.commentReaction.update({
            status:false,userId:req.user.id,commentId:attribute.commentId
        },{where: {id:dislikeReactionExist.id}}
        );
        msg = 'updated dislike'
    
    } else {
        reactions = await models.reaction.create(
            {status:false,userId:req.user.id,commentId:attribute.commentId}
            );
        msg = 'created dislike';
    }
    res.json(msg); 
}

async function destroyReaction(req,res){
    var reactions, msg;
    const attribute = req.params;
    const reactionExist =  await models.reaction.findOne({
        where:{userId:req.user.id, reaction:true, postId:attribute.postId}
    });
    if(reactionExist){
        reactions = await models.reaction.destroy({where: {id:reactionExist.id}});
        msg = 'removed like'
    } else {msg = "Nothing to like"}
      res.json(msg);
}

async function destroyCommentReaction(req,res){
    var reactions, msg;
    const attribute = req.params;
    const reactionExist =  await models.commentReaction.findOne({
        where:{userId:req.user.id, status:true, commentId:attribute.commentId}
    });
    if(reactionExist){
        reactions = await models.commentReaction.destroy({where: {id:reactionExist.id}});
        msg = 'removed like'
    } else {msg = "Nothing to like"}
      res.json(msg);
}

async function destroyDislikeReaction(req,res){
    var reactions, msg;
    const attribute = req.params;
    const reactionExist =  await models.reaction.findOne({
        where:{userId:req.user.id,reaction:false, postId:attribute.postId}
    });
    if(reactionExist){
        reactions = await models.reaction.destroy({where: {id:reactionExist.id}});
        msg = 'removed dislike'
    } else { msg = "Nothing to Dislike"}
    res.json(msg);
}
async function destroyCommentDislikeReaction(req,res){
    var reactions, msg;
    const attribute = req.params;
    const reactionExist =  await models.commentReaction.findOne({
        where:{userId:req.user.id,status:false, commentId:attribute.commentId}
    });
    if(reactionExist){
        reactions = await models.commentReaction.destroy({where: {id:reactionExist.id}});
        msg = 'removed dislike'
    } else { msg = "Nothing to Dislike"}
    res.json(msg);
}

module.exports = {
    createReaction,
    destroyDislikeReaction,
    createDislikeReaction,
    destroyReaction,
	getOneReaction,
	getDislikes,
    getLikes,
    createCommentLikeReaction,
    createDislikeCommentReaction,
    destroyCommentReaction,
    destroyCommentDislikeReaction
}