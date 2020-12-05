const express = require('express');
const router = express.Router();
const postCntrl = require ('../controllers/post.controller');
const passport = require('passport');

router.get ('/', postCntrl.getPost);
router.get('/category/:id',postCntrl.getPosts);
router.post ('/create/:id',passport.authenticate("jwt",{session:false}), postCntrl.createPostText);
router.post('/createImage/:postId',passport.authenticate("jwt",{session:false}),postCntrl.createPostImages);
router.put('/create/:postId',passport.authenticate("jwt",{session:false}),postCntrl.updatePostImages);
router.put ('/:id',passport.authenticate("jwt",{session:false}), postCntrl.updatePost);
router.delete ('/:id',passport.authenticate("jwt",{session:false}), postCntrl.deletePost);

module.exports = router;
