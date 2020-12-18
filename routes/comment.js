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

// get likes and dislikes of comment reply
router.get('/getCommentReplyReaction/:id',commentController.getCommentReplyReaction)
router.get('/commentReplyLikes/:id',commentController.getCommentReplyLikes);
router.get('/commentReplyDislikes/:id',commentController.getCommentReplyDislikes)

//get replies of a comment 
router.get('/commentReplies/:id', commentController.getRepliesOfAComment)
router.get('/:id/commentReply/:replyId', commentController.getRepliesOfAComment)

    //Create a comment of a post
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
router.delete('/deleteCommentReply/:id',passport.authenticate('jwt',{session:false}),commentController.deleteCommentReply)


module.exports = router;