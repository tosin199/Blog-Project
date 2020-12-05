const models = require('../models/index');

const multer = require('multer');
const helpers = require('../config/helper')
const multerConfig = require('../config/multer')

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
    multerConfig.singleUpload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
            return res.json(err.message);
        } 
        else if (err) {
          return res.json(err);
        } else if(!req.file){
            await models.comment.create({image:'no image yet',content:req.body.content,userId:req.user.id,postId:req.params.postId}, {where:{id:req.user.id}});
            return  res.json({'msg': 'uploaded', 'file':req.file,"body":req.body.content});
        } else {
            await models.comment.create({image:req.file.path,content:req.body.content,userId:req.user.id,postId:req.params.postId}, {where:{id:req.user.id}});
            return  res.json({'msg': 'uploaded', 'file':req.file,"body":req.body.content});
        }
        
        }  
   
       
    )
}


async function updateComment(req,res){
    multerConfig.singleUpload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
            return res.json(err.message);
        } 
        else if (err) {
          return res.json(err);
        } else if(!req.file){
            await models.comment.update({image:'no image yet',content:req.body.content,userId:req.user.id,postId:req.params.postId}, {where:{id:req.user.id}});
            return  res.json({'msg': 'uploaded', 'file':req.file,"body":req.body.content});
        } else {
            await models.comment.update({image:req.file.path,content:req.body.content,userId:req.user.id,postId:req.params.postId}, {where:{id:req.user.id}});
            return  res.json({'msg': 'uploaded', 'file':req.file,"body":req.body.content});
        }
        
        }   
    )
   
};


async function destroyComment(req,res){
    var commentId = req.params.id;
    var data = req.body;
    const comment = await models.comment.destroy({where: {id: commentId,userId:req.user.id,postId:req.params.postId}});
    res.send('deleted');
}

module.exports = {
    getAllcommentOfAPost,
    createComment,
    updateComment,
    destroyComment,
    getcommentOfAPost,
};
// console.log("usee>>>>>>>",req.files);
//           for(var i= 0;1<(req.files.length-1); i++){
//             await models.comment.create(
//                 {
//                     image:req.files[i].path,
//                     content:data.content,
//                     userId:req.user.id,
//                     postId:req.params.postId
//                 }, {
//                     where:{id:req.user.id}
//                     }
//                     );
//           }
//           return  res.json(
//               {
//                   "comment":data.content,
//                   'files':req.files
//                 }
//             );
//         } 