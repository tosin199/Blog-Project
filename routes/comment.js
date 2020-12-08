var express = require('express');
var router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comment.controller.js');
    //Retrieve all comment
router.get('/:postId',  commentController.getAllcommentOfAPost)
router.get('/:id/post/:postId', commentController. getcommentOfAPost);
// get likes and dislikes of comment
router.get('/getCommentReaction/:id',commentController.getReactionOfAComment)
router.get('/likes/:id',commentController.getLikesOfAPostComment);
router.get('/dislikes/:id',commentController.getLikesOfAPostComment)
//get replies of a comment reply
router.get('/commentReplies/:id', commentController.getRepliesOfAComment)
    //Create all comment of a post
router.post('/post/:postId',passport.authenticate("jwt",{session:false}), commentController.createComment);
//reply a comment
router.post('/addReply/:id',passport.authenticate('jwt',{session:false}),commentController.replyComment);
    //Update comment 
router.put('/post/:postId',passport.authenticate("jwt",{session:false}), commentController.updateComment);
// update comment reply
router.put('/editCommentReply/:id',passport.authenticate('jwt',{session:false}),commentController.editCommentReply);
    
    //Delete comment
router.delete('/post/:postId',passport.authenticate("jwt",{session:false}), commentController.destroyComment);
// delete comment reply 
router.delete('/deleteCommentReply',passport.authenticate('jwt',{session:false}),commentController.deleteCommentReply)


module.exports = router;