var express = require('express');
var router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comment.controller.js');
    //Retrieve all comment
router.get('/:postId',  commentController.getAllcommentOfAPost)
router.get('/:id/post/:postId', commentController. getcommentOfAPost);
    //Create all comment of a post
router.post('/post/:postId',passport.authenticate("jwt",{session:false}), commentController.createComment);

    //Update comment 
router.put('/post/:postId',passport.authenticate("jwt",{session:false}), commentController.updateComment);
    
    //Delete comment
router.delete('/post/:postId',passport.authenticate("jwt",{session:false}), commentController.destroyComment);


module.exports = router;