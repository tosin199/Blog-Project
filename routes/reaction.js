var express = require('express');
var router = express.Router();
const controller = require("../controllers/reaction.controller.js");
const passport = require('passport');


const cors = require('../config/cors');

router.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
    //Retrieve reactions of a post
router.get('/:id',
	cors.cors,
  controller.getOneReaction
);
router.get('/like/:id',
  cors.cors,
  controller.getLikes
);
router.get('/dislike/:id',
  cors.cors,
  controller.getDislikes
);

    //Create all reactions
router.post('/like/post/:postId',
	cors.corsWithOptions,
	passport.authenticate("jwt",{session:false}),
	controller.createReaction
);
router.post('/dislike/post/:postId',
	cors.corsWithOptions,
	passport.authenticate("jwt",{session:false}),
	controller.createDislikeReaction
);

// create comment  Reaction
router.post('/likeComment/:commentId',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	controller.createCommentLikeReaction
);
router.post('/dislikeComment/:commentId',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	controller.createDislikeCommentReaction
);
    // delete reaction
router.delete('/like/post/:postId',
	cors.corsWithOptions,
	passport.authenticate("jwt",{session:false}),
	controller.destroyReaction
);
router.delete('/dislike/post/:postId',
	cors.corsWithOptions,
	passport.authenticate("jwt",{session:false}),
	controller.destroyDislikeReaction
);
//delete comment reaction
router.delete('/removeLike/:commentId',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	controller.destroyCommentReaction
);
router.delete('/removeDislike/:commentId',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	controller.destroyCommentDislikeReaction
);
//create comment reply reaction
router.post('/likeComment/:commentReplyId',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	controller.createCommentReplyLikeReaction
);
router.post('/dislikeComment/:commentReplyId',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	controller.createDislikeCommentReplyReaction
);
//delete comment reply reactiom
router.delete('/removeLike/:commentReplyId',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	controller.destroyCommentReplyReaction
);
router.delete('/removeDislike/:commentReplyId',
	cors.corsWithOptions,
	passport.authenticate('jwt',{session:false}),
	controller.destroyCommentReplyDislikeReaction
);
module.exports = router;