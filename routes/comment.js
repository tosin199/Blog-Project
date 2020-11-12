var express = require('express');
var router = express.Router();

const commentController = require('../controllers/comment.controller.js');
    //Retrieve all comment
    router.get('/', commentController.getComment);
    router.get('/:id/user/:userId/post/:postId',commentController. getcommentOfAPost);
    //Create all comment of a post
    router.post('/user/:userId/post/:postId',commentController.createComment);

    //Update comment 
    router.put('/:id/user/:userId/post/:postId',commentController.updateComment);
    
    //Delete comment
    router.delete('/:id/user/:userId/post/:postId',commentController.destroyComment);


module.exports = router;