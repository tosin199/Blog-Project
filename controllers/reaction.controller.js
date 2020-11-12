const models = require('../models/index');
// const controller = require('../models/reaction');
async function getReaction(req,res){
    const reaction = await models.reaction.findAll({include:[models.user]});
    res.json(reaction);
}
async function getOneReaction(req,res){
    const reaction = await models.reaction.findAll({where:{postId:req.params.id}},{include:[models.user]});
    res.json(reaction);    
}
async function createReaction(req,res){
    // var data = req.body
    var reactions, msg;
    const attribute = req.params
    const reactionExist = await models.reaction.findOne({where:{userId:attribute.userId,postId:attribute.postId}})
    if (reactionExist){ 
        reactions = await models.reaction.update({reaction:true,userId:req.params.userId,postId:req.params.postId},{where: {id:reactionExist.id}});
        msg = 'updated like'

    } else {
        reactions = await models.reaction.create({reaction:true,userId:attribute.userId,postId:attribute.postId});
        msg = 'created like'
    
    }
    res.json(msg);
    
}

async function createDislikeReaction(req,res){
    // var data = req.body
    var reactions, msg;
    const attribute = req.params
    const dislikeReactionExist = await models.reaction.findOne({where:{userId:attribute.userId,postId:attribute.postId}})
    if (dislikeReactionExist){ 
        reactions = await models.reaction.update({reaction:false,userId:req.params.userId,postId:req.params.postId},{where: {id:dislikeReactionExist.id}});
        msg = 'updated dislike'
    
    } else {
        reactions = await models.reaction.create({reaction:false,userId:attribute.userId,postId:attribute.postId});
        msg = 'created dislike';
    }
    res.json(msg);
    
}


async function destroyReaction(req,res){
    var userId = req.params.id
    // var data = req.body;
    var reactions, msg;
    const attribute = req.params;
    const reactionExist =  await models.reaction.findOne({where:{userId:attribute.userId, reaction:true, postId:attribute.postId}});
    if(reactionExist){
        reactions = await models.reaction.destroy({where: {id:reactionExist.id}});
        msg = 'removed like'
    } else {msg = "Nothing to like"}
      res.json(msg);
}

async function destroyDislikeReaction(req,res){
    var userId = req.params.id
    // var data = req.body;
    var reactions, msg;
    const attribute = req.params;
    const reactionExist =  await models.reaction.findOne({where:{userId:attribute.userId,reaction:false, postId:attribute.postId}});
    if(reactionExist){
        reactions = await models.reaction.destroy({where: {id:reactionExist.id}});
        msg = 'removed dislike'
    } else { msg = "Nothing to Dislike"}
    res.json(msg);
}

module.exports = {
    getReaction,
    createReaction,
    destroyDislikeReaction,
    createDislikeReaction,
    destroyReaction,
    getOneReaction
}