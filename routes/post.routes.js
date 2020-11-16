const express = require('express');
const router = express.Router();
const postCntrl = require ('../controllers/post.controller');

router.get ('/', postCntrl.getPost);
router.get('/category/:id',postCntrl.getPosts);
router.post ('/create/:id', postCntrl.createPost);
router.put ('/:id', postCntrl.updatePost);
router.delete ('/:id', postCntrl.deletePost);

module.exports = router;
