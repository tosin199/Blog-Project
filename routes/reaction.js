var express = require('express');
var router = express.Router();
const controller = require("../controllers/reaction.controller.js");
    //Retrieve all reactions 
    router.get('/', controller.getReaction);
    //Retrieve reactions of a post
    router.get('/:id',controller.getOneReaction);
    //Create all reactions
    router.post('/like/user/:userId/post/:postId',controller.createReaction);
    router.post('/dislike/user/:userId/post/:postId',controller.createDislikeReaction);

    // delete reaction
    router.delete('/like/user/:userId/post/:postId',controller.destroyReaction);
    router.delete('/dislike/user/:userId/post/:postId',controller.destroyDislikeReaction);


module.exports = router;