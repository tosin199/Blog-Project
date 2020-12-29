var express = require('express');
var router = express.Router();
const passport = require('passport');

const cors = require('../config/cors');

router.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
const commentController = require('../controllers/comment.controller.js');
    //Retrieve all comment
router.get('/:postId', 
	cors.cors, 
	commentController.getAllcommentOfAPost
);
router.get('/:id/post/:postId',
	cors.cors,
	commentController.getcommentOfAPost
);
// get likes and dislikes of comment
router.get('/getCommentReaction/:id',
	cors.cors,
	commentController.getReactionOfAComment
);
router.get('/likes/:id',
	cors.cors,
	commentController.getLikesOfAPostComment
);
router.get('/dislikes/:id',
	cors.cors,
	commentController.getLikesOfAPostComment
);

// get likes and dislikes of comment reply
router.get('/getCommentReplyReaction/:id',
	cors.cors,
	commentController.getCommentReplyReaction
);
router.get('/commentReplyLikes/:id',
	cors.cors,
	commentController.getCommentReplyLikes
);
router.get('/commentReplyDislikes/:id',
	cors.cors,
	commentController.getCommentReplyDislikes
);



//get replies of a comment 
router.get('/commentReplies/:id',
	cors.cors, 
	commentController.getRepliesOfAComment
);
router.get('/:id/commentReply/:replyId',
	cors.cors, 
	commentController.getRepliesOfAComment
);

    //Create a comment of a post
router.post('/post/:postId',
	cors.corsWithOptions,
	passport.authenticate("jwt",{session:false}), 
	commentController.createComment
);
//reply a comment
router.post('/addReply/:id',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	commentController.replyComment
);
    //Update comment 
router.put('/post/:postId',
	cors.corsWithOptions,
	passport.authenticate("jwt",{session:false}), 
	commentController.updateComment
);
// update comment reply
router.put('/editCommentReply/:id',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	commentController.editCommentReply
);
    
    //Delete comment
router.delete('/post/:postId',
	cors.corsWithOptions,
	passport.authenticate("jwt",{session:false}), 
	commentController.destroyComment
);
// delete comment reply 
router.delete('/deleteCommentReply/:id',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	commentController.deleteCommentReply
);


module.exports = router;