var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin.post.controller');
const postCntrl = require('../controllers/post.controller');
const passport = require('passport');



const cors = require('../config/cors');

router.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
router.get ('/',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  adminController.adminGetPost
);
router.get ('/unpublished',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  adminController.adminGetUnpublishedPost
);
router.get('/category/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  adminController.adminGetPosts
);
router.get('/publish',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  adminController.adminGetUnpublishedPosts
);
router.post('/publish/:id',
  cors.corsWithOptions,
   passport.authenticate("jwt",{session:false}),
   adminController.adminPublishPost
  );
router.post('/unpublish/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  adminController.adminUnpublishPost
);
router.post ('/create/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  adminController.adminCreatePostText
);
router.post('/createImage/:postId',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  postCntrl.createPostImages
);
router.put('/editImage/:postId',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  postCntrl.updatePostImages
);
router.put ('/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  adminController.adminUpdatePost
);
router.delete ('/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  postCntrl.deletePost
);

module.exports = router;