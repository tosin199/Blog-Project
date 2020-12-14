const models = require('../models/index');

const multer = require('multer');
const helpers = require('../config/helper');
const multerConfig = require('../config/multer')

async function getAllcommentOfAPost(req,res){
    const comment = await models.comment.findAndCountAll({include:[{model:models.user},{model:models.commentReaction}],order:[['createdAt','DESC']]},{where: {postId:req.params.postId}});
    res.json(comment);  
}

async function getcommentOfAPost(req,res){
    commentId = req.params.id; 
    const comment = await models.comment.findAndCountAll({include:[{model:models.user},{model:models.commentReaction},{model:models.commentReply}],order:[['createdAt','DESC']],where: {id: commentId,postId:req.params.postId}});
    res.json(comment);  
}
async function getReactionOfAComment(req,res){
	commentId = req.params.id; 
	const commentReaction = await models.commentReaction.findAndCountAll({include:[models.user]},{where:{commentId:commentId}})
	res.json(commentReaction);
}
async function getLikesOfAPostComment(req,res){
	commentId = req.params.id; 
	const commentReaction = await models.commentReaction.findAndCountAll({include:[models.user]},{where:{commentId:commentId,status:true}})
	res.json(commentReaction);
}
async function getDislikesOfAPostComment(req,res){
	commentId = req.params.id; 
	const commentReaction = await models.commentReaction.findAndCountAll({include:[models.user]},{where:{commentId:commentId,status:false}})
	res.json(commentReaction)
}
async function createComment(req,res){
    multerConfig.singleUpload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
            return res.json(err.message);
        } 
        else if (err) {
          return res.json(err);
        } else if(!req.file){
            await models.comment.create({image:'no image yet',content:req.body.content,userId:req.user.id,postId:req.params.postId});
            return  res.json({'msg': 'uploaded', 'file':req.file,"body":req.body.content});
        } else {
            await models.comment.create({image:req.file.path,content:req.body.content,userId:req.user.id,postId:req.params.postId});
            return  res.json({'msg': 'uploaded', 'file':req.file,"body":req.body.content});
        }
        
        }  
   
       
    )
}


async function updateComment(req,res){
    const comment = await models.comment.findOne({where:{userId:req.user.id}});
    if(comment){
        multerConfig.singleUpload(req, res, async function(err) {
            if (err instanceof multer.MulterError) {
                return res.json(err.message);
            } 
            else if (err) {
              return res.json(err);
            } else if(!req.file){
                await models.comment.update({image:'no image yet',content:req.body.content,userId:req.user.id,postId:req.params.postId}, {where:{userId:req.user.id}});
                return  res.json({'msg': 'uploaded', 'file':req.file,"body":req.body.content});
            } else {
                await models.comment.update({image:req.file.path,content:req.body.content,userId:req.user.id,postId:req.params.postId}, {where:{UserId:req.user.id}});
                return  res.json({'msg': 'uploaded', 'file':req.file,"body":req.body.content});
            }
            
            }   
        )
    } else{
		res.setStatusCode = 400;
        res.json('unauthorize')
    }
   
   
};


async function destroyComment(req,res){
	const comment = await models.comment.findOne({where:{userId:req.user.id}});
  if(comment){
    var commentId = req.params.id;
    var data = req.body;
    const comment = await models.comment.destroy({where: {id: commentId,userId:req.user.id,postId:req.params.postId}});
		res.send('deleted');
	} else {
		res.setStatusCode = 400;
		res.json('unauthorize')
	}
}
async function replyComment(req,res){
	commentId = req.params.id;
	const comment = await models.commentReply.create({content:req.body.content,userId:req.user.id,commentId:req.params.id})
	res.json({'msg':'comment created','comment':comment})
}
async function editCommentReply(req,res){
	const comment = await models.comment.findOne({where:{userId:req.user.id}});
  if(comment){
	commentId = req.params.id;
	const comment = await models.commentReply.update({content:req.body.content,userId:req.user.id,commentId:req.params.id})
	res.json({'msg':'comment updated','comment':comment});
	} else {
		res.setStatusCode = 400;
		res.json('unauthorize')
	}
}
async function deleteCommentReply(req,res){
const comment = await models.comment.findOne({where:{userId:req.user.id}});
  if(comment){
	commentId = req.params.id;
	const comment = await models.commentReply.destroy({where:{commentId:commentId,userId:req.user.id}})
	} else {
		res.setStatusCode = 400;
		res.json('unauthorize')
	}
}
async function getRepliesOfAComment(req,res){
	commentId = req.params.id;
	const comments = await models.commentReply.findAndCountAll({include:[{model:models.user},{model:models.commentReplyReaction}]},{where:{commentId:commentId}});
	res.json(comments);
}
module.exports = {
    getAllcommentOfAPost,
    createComment,
    updateComment,
    destroyComment,
	getcommentOfAPost,
	getReactionOfAComment,
	getLikesOfAPostComment,
	getDislikesOfAPostComment,
	replyComment,
	getRepliesOfAComment,
	editCommentReply,
	deleteCommentReply

};
