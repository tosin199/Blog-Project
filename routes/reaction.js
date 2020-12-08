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

// create comment like Reaction
router.post('/like/post/:commentId',passport.authenticate('jwt',{session:false}),controller.createCommentLikeReaction)
router.post('/dislike/post/:commentId',passport.authenticate('jwt',{session:false}),controller.createDislikeCommentReaction)
    // delete reaction
router.delete('/like/post/:postId',passport.authenticate("jwt",{session:false}),controller.destroyReaction);
router.delete('/dislike/post/:postId',passport.authenticate("jwt",{session:false}),controller.destroyDislikeReaction);
//delete comment reaction
router.delete('removeLike/:commentId',passport.authenticate('jwt',{session:false}),controller.destroyCommentReaction);
router.delete('removeDislike/:commentId',passport.authenticate('jwt',{session:false}),controller.destroyCommentReaction);
module.exports = router;