var express = require('express');
var router = express.Router();

const commentController = require('../controllers/comment.controller.js');
    //Retrieve all reactions 
    router.get('/', commentController.getComment);

    //Create all reactions
    router.post('/',commentController.createComment);

    //Update reactions 
    router.put('/:id',commentController.updateComment);
    
    //Delete reactions
    router.delete('/:id',commentController.destroyComment);


module.exports = router;