const models = require('../models/index');

async function getOneReaction(req,res){
    const reaction = await models.reaction.findAndCountAll(
        {where:{postId:req.params.id}},
        {include:[models.user]}
    );
    res.json({'status':'success','data':reaction});    
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
	res.json({'status':'success','data':likes});
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
	res.json({'status':'success','data':dislikes});
}

async function createReaction(req,res){
    var reactions, message;
    const attribute = req.params;
    const reactionExist = await models.reaction.findOne({
        where:{userId:req.user.id,postId:attribute.postId}
    });
    if (reactionExist){ 
        reactions = await models.reaction.update({
            reaction:true,userId:req.user.id,postId:attribute.postId
        },{where: {id:reactionExist.id}}
        );
        message = 'updated like'

    } else {
        reactions = await models.reaction.create({
            reaction:true,userId:req.user.id,postId:attribute.postId}
        );
        message = 'created like'
    
    }
    res.json({'status':'success','data':message});
    
}
async function createCommentLikeReaction(req,res){
    var reactions, message;
    const attribute = req.params;
    const reactionExist = await models.commentReaction.findOne({
        where:{userId:req.user.id,commentId:attribute.commentId}
    });
    if (reactionExist){ 
        reactions = await models.commentReaction.update({
            status:true,userId:req.user.id,commentId:attribute.commentId
        },{where: {commentId:attribute.commentId}}
        );
        message = 'updated like'

    } else {
        reactions = await models.commentReaction.create({
            status:true,userId:req.user.id,commentId:attribute.commentId}
        );
        message = 'created like'
    
    }
    res.json({'status':'success','message':message})
}

async function createDislikeReaction(req,res){{order:['createdAt']}
    var reactions, message;
    const attribute = req.params
    const dislikeReactionExist = await models.reaction.findOne({
        where:{userId:attribute.userId,postId:attribute.postId}})
    if (dislikeReactionExist){ 
        reactions = await models.reaction.update({
            reaction:false,userId:req.user.id,postId:attribute.postId
        },{where: {id:dislikeReactionExist.id}}
        );
        message = 'updated dislike'
    
    } else {
        reactions = await models.reaction.create(
            {reaction:false,userId:req.user.id,postId:attribute.postId}
            );
        message = 'created dislike';
    }
    res.json({'status':'success','message':message});
    
}

async function createDislikeCommentReaction(req,res){
    var reactions, message;
    const attribute = req.params
    const dislikeReactionExist = await models.commentReaction.findOne({
        where:{userId:attribute.userId,commentId:attribute.commentId}})
    if (dislikeReactionExist){ 
        reactions = await models.commentReaction.update({
            status:false,userId:req.user.id,commentId:attribute.commentId
        },{where: {id:dislikeReactionExist.id}}
        );
        message = 'updated dislike'
    
    } else {
        reactions = await models.commentReaction.create(
            {status:false,userId:req.user.id,commentId:attribute.commentId}
            );
        message = 'created dislike';
    }
    res.json({'status':'success','message':message}); 
}

async function destroyReaction(req,res){
    var reactions, message;
    const check = await models.reaction.findOne({where:{id:{userId:req.user.id}}})
    if(check){
		const attribute = req.params;
		const reactionExist =  await models.reaction.findOne({
				where:{userId:req.user.id, reaction:true, postId:attribute.postId}
		});
		if(reactionExist){
					reactions = await models.reaction.destroy({where: {id:reactionExist.id}});
					message = 'removed like'
			} else {
				message = "Nothing to like"
			}
				res.json({'status':'success','data':message});
    } else {
			res.setStatusCode = 400;
			res.json('unauthorize')
		}
    
}

async function destroyCommentReaction(req,res){
    var reactions, message;
		const attribute = req.params;
		const check = await models.commentReaction.findOne({where:{id:{userId:req.user.id}}})
    if(check){
			const reactionExist =  await models.commentReaction.findOne({
					where:{userId:req.user.id, status:true, commentId:attribute.commentId}
			});
			if(reactionExist){
					reactions = await models.commentReaction.destroy({where: {id:reactionExist.id}});
					message = 'removed like'
			} else {message = "Nothing to like"}
				res.json({'status':'success','message':message});
		}else {
			res.setStatusCode = 400;
			res.json('unauthorize')
		}
}

async function destroyDislikeReaction(req,res){
    var reactions, message;
		const attribute = req.params;
		const check = await models.reaction.findOne({where:{id:{userId:req.user.id}}})
    if(check){
    const reactionExist =  await models.reaction.findOne({
        where:{userId:req.user.id,reaction:false, postId:attribute.postId}
    });
    if(reactionExist){
        reactions = await models.reaction.destroy({where: {id:reactionExist.id}});
        message = 'removed dislike'
    } else { 
			message = "Nothing to Dislike"
		}
		res.json({'status':'success','message':message});
		} else{
			res.setStatusCode = 400;
			res.json('unauthorize')
		}	
}
async function destroyCommentDislikeReaction(req,res){
    var reactions, message;
		const attribute = req.params;
		const check = await models.commentReaction.findOne({where:{id:{userId:req.user.id}}})
    if(check){
    const reactionExist =  await models.commentReaction.findOne({
        where:{userId:req.user.id,status:false, commentId:attribute.commentId}
    });
    if(reactionExist){
        reactions = await models.commentReaction.destroy({where: {id:reactionExist.id}});
        message = 'removed dislike'
    } else { message = "Nothing to Dislike"}
		res.json({'status':'success','data':message});
		}	 else{
			res.setStatusCode = 400;
			res.json('unauthorize')
		}
}

async function createCommentReplyLikeReaction(req,res){
    var reactions, message;
    const attribute = req.params;
    const reactionExist = await models.commentReaction.findOne({
        where:{userId:req.user.id,commentId:attribute.commentId}
    });
    if (reactionExist){ 
        reactions = await models.commentReaction.update({
            status:true,userId:req.user.id,commentReplyId:attribute.commentId
        },{where: {commentReplyId:attribute.commentReplyId}}
        );
        message = 'updated like'

    } else {
        reactions = await models.commentReaction.create({
            status:true,userId:req.user.id,commentReplyId:attribute.commentReplyId}
        );
        message = 'created like'
    
    }
    res.json({'status':'success','message':message})
}
async function createDislikeCommentReplyReaction(req,res){
    var reactions, message;
    const attribute = req.params
    const dislikeReactionExist = await models.commentReaction.findOne({
        where:{userId:attribute.userId,commentReplyId:attribute.commentReplyId}})
    if (dislikeReactionExist){ 
        reactions = await models.commentReaction.update({
            status:false,userId:req.user.id,commentReplyId:attribute.commentReplyId
        },{where: {id:dislikeReactionExist.id}}
        );
        message = 'updated dislike'
    
    } else {
        reactions = await models.commentReaction.create(
            {status:false,userId:req.user.id,commentReplyId:attribute.commentReplyId}
            );
        message = 'created dislike';
    }
    res.json({'status':'success','message':message}); 
}
async function destroyCommentReplyReaction(req,res){
    var reactions, message;
		const attribute = req.params;
		const check = await models.ReplyReaction.findOne({where:{id:{userId:req.user.id}}})
    if(check){
			const reactionExist =  await models.commentReaction.findOne({
					where:{userId:req.user.id, status:true, commentReplyId:attribute.commentReplyId}
			});
			if(reactionExist){
					reactions = await models.commentReaction.destroy({where: {id:reactionExist.id}});
					message = 'removed like'
			} else {message = "Nothing to like"}
				res.json({'status':'success','message':message});
		}else {
			res.setStatusCode = 400;
			res.json('unauthorize')
		}
}
async function destroyCommentReplyDislikeReaction(req,res){
    var reactions, message;
		const attribute = req.params;
		const check = await models.commentReaction.findOne({where:{id:{userId:req.user.id}}})
    if(check){
    const reactionExist =  await models.commentReaction.findOne({
        where:{userId:req.user.id,status:false, commentReplyId:attribute.commentReplyId}
    });
    if(reactionExist){
        reactions = await models.commentReaction.destroy({where: {id:reactionExist.id}});
        message = 'removed dislike'
    } else { message = "Nothing to Dislike"}
		res.json({'status':'success','message':message});
		}	 else{
			res.setStatusCode = 400;
			res.json('unauthorize')
		}
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
    destroyCommentDislikeReaction,
    createCommentReplyLikeReaction,
    createDislikeCommentReplyReaction,
    destroyCommentReplyReaction,
    destroyCommentReplyDislikeReaction
}