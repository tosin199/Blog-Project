var express = require('express');
var router = express.Router();
const controller = require("../controllers/reaction.controller.js");
const passport = require('passport');

    //Retrieve reactions of a post
router.get('/:id',controller.getOneReaction);
router.get('/like/:id',controller.getLikes);
router.get('/dislike/:id',controller.getDislikes);

    //Create all reactions
router.post('/like/post/:postId',passport.authenticate("jwt",{session:false}),controller.createReaction);
router.post('/dislike/post/:postId',passport.authenticate("jwt",{session:false}),controller.createDislikeReaction);

// create comment  Reaction
router.post('/likeComment/:commentId',passport.authenticate('jwt',{session:false}),controller.createCommentLikeReaction)
router.post('/dislikeComment/:commentId',passport.authenticate('jwt',{session:false}),controller.createDislikeCommentReaction)
    // delete reaction
router.delete('/like/post/:postId',passport.authenticate("jwt",{session:false}),controller.destroyReaction);
router.delete('/dislike/post/:postId',passport.authenticate("jwt",{session:false}),controller.destroyDislikeReaction);
//delete comment reaction
router.delete('/removeLike/:commentId',passport.authenticate('jwt',{session:false}),controller.destroyCommentReaction);
router.delete('/removeDislike/:commentId',passport.authenticate('jwt',{session:false}),controller.destroyCommentDislikeReaction);
//create comment reply reaction
router.post('/likeComment/:commentReplyId',passport.authenticate('jwt',{session:false}),controller.createCommentReplyLikeReaction)
router.post('/dislikeComment/:commentReplyId',passport.authenticate('jwt',{session:false}),controller.createDislikeCommentReplyReaction)
//delete comment reply reactiom
router.delete('/removeLike/:commentReplyId',passport.authenticate('jwt',{session:false}),controller.destroyCommentReplyReaction);
router.delete('/removeDislike/:commentReplyId',passport.authenticate('jwt',{session:false}),controller.destroyCommentReplyDislikeReaction);
module.exports = router;