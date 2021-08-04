const express = require('express');
const router = express.Router();
const postCntrl = require ('../controllers/post.controller');
const passport = require('passport');


const cors = require('../config/cors');

router.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
router.get ('/',
  cors.cors, 
  postCntrl.getPost
);
router.get ('/:id',
  cors.cors, 
  postCntrl.getAPost
);
router.get('/category/:id',
  cors.cors,
  postCntrl.getPosts
);

router.post('/create/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  postCntrl.createPost
);
router.put('/edit/:postId',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  postCntrl.updatePost
);
router.put ('/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}), 
  postCntrl.updatePost
  );
router.delete ('/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}), 
  postCntrl.deletePost
);
router.post('/impression/:id',
  cors.cors,
  postCntrl.createImpression
);
router.get('/impression/:id',
  cors.cors,
  postCntrl.getImpression
);

module.exports = router;
