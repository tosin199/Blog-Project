const models = require('../models/index');


async function getAllcommentOfAPost(req,res){
    const comment = await models.comment.findAndCountAll({include:[models.user],attributes:['firstname','lastname']},{where: {postId:req.params.postId}});
    res.json(comment);  
}

async function getcommentOfAPost(req,res){
    commentId = req.params.id; 
    const comment = await models.comment.findAndCountAll({include:[models.user]},{where: {id: commentId,userId:req.user.id,postId:req.params.postId}});
    res.json(comment);  
}


async function createComment(req,res){
    var data = req.body
    const comment = await models.comment.create({content:data.content,userId:req.user.id,postId:req.params.postId})
    res.json(comment);
}


async function updateComment(req,res){
    var Id= req.params.id;
    var data = req.body;
    const comment = await models.comment.update({content:data.content,userId:req.user.id,postId:req.params.postId},{where: {id:Id}});
    res.json(comment);
};


async function destroyComment(req,res){
    var commentId = req.params.id;
    var data = req.body;
    const comment = await models.comment.destroy({where: {id: commentId,userId:req.user.id,postId:req.params.postId}});
    res.send('deleted');
}
async function uploadMultiPic(req,res){

  if(req.file){
    console.log("usee>>>>>>>",req.user);
    await models.user.update({profilePicture:req.file.path}, {where:{id:req.user.id}});
    return  res.json({'msg': 'uploaded', 'file':req.file});;
  } 
}


module.exports = {
    getAllcommentOfAPost,
    createComment,
    updateComment,
    destroyComment,
    getcommentOfAPost,
    uploadMultiPic
};