var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin.post.controller');
const postCntrl = require('../controllers/post.controller');
const passport = require('passport');


router.get ('/',passport.authenticate("jwt",{session:false}), adminController.adminGetPost);
router.get ('/unpublished',passport.authenticate("jwt",{session:false}), adminController.adminGetUnpublishedPost);
router.get('/category/:id',passport.authenticate("jwt",{session:false}),adminController.adminGetPosts);
router.get('/publish',passport.authenticate("jwt",{session:false}),adminController.adminGetUnpublishedPosts);
router.post('/publish/:id', passport.authenticate("jwt",{session:false}),adminController.adminPublishPost);
router.post('/unpublish/:id',passport.authenticate("jwt",{session:false}),adminController.adminUnpublishPost);
router.post ('/create/:id',passport.authenticate("jwt",{session:false}),adminController.adminCreatePostText);
router.post('/createImage/:postId',passport.authenticate("jwt",{session:false}),postCntrl.createPostImages);
router.put('/editImage/:postId',passport.authenticate("jwt",{session:false}),postCntrl.updatePostImages);
router.put ('/:id',passport.authenticate("jwt",{session:false}), adminController.adminUpdatePost);
router.delete ('/:id',passport.authenticate("jwt",{session:false}), postCntrl.deletePost);

module.exports = router;