var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin.post.controller');
const postCntrl = require('../controllers/post.controller');
const passport = require('passport');


router.get ('/', adminController.adminGetPost);
router.get ('/unpublished', adminController.adminGetUnpublishedPost);
router.get('/category/:id',adminController.adminGetPosts);
router.get('/unpublished/category/:id',adminController.adminGetUnpublishedPosts);
router.post ('/create/:id',passport.authenticate("jwt",{session:false}),adminController.adminCreatePostText);
router.post('/createImage/:postId',passport.authenticate("jwt",{session:false}),postCntrl.createPostImages);
router.put('/editImage/:postId',passport.authenticate("jwt",{session:false}),postCntrl.updatePostImages);
router.put ('/:id',passport.authenticate("jwt",{session:false}), adminController.adminUpdatePost);
router.delete ('/:id',passport.authenticate("jwt",{session:false}), postCntrl.deletePost);

module.exports = router;