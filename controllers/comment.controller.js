const models = require('../models/index');

async function getcommentOfAPost(req,res){
    commentId = req.params.id; 
    const comment = await models.comment.findAndCountAll({include:[models.user]},{where: {id: commentId,userId:req.params.userId,postId:req.params.postId}});
    res.json(comment);  
}


async function createComment(req,res){
    var data = req.body
    const comment = await models.comment.create({content:data.content,userId:req.params.userId,postId:req.params.postId})
    res.json(comment);
}


async function updateComment(req,res){
    var Id= req.params.id;
    var data = req.body;
    const comment = await models.comment.update({content:data.content,userId:req.params.userId,postId:req.params.postId},{where: {id:Id}});
    res.json(comment);
};


async function destroyComment(req,res){
    var commentId = req.params.id;
    var data = req.body;
    const comment = await models.comment.destroy({where: {id: commentId,userId:req.params.userId,postId:req.params.postId}});
    res.send('deleted');
}


module.exports = {
    createComment,
    updateComment,
    destroyComment,
    getcommentOfAPost
};