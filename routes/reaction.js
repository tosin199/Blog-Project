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

    // delete reaction
router.delete('/like/user/post/:postId',passport.authenticate("jwt",{session:false}),controller.destroyReaction);
router.delete('/dislike/user/post/:postId',passport.authenticate("jwt",{session:false}),controller.destroyDislikeReaction);


module.exports = router;