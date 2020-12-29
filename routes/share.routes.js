const express = require('express');
const router = express.Router();
const shareCntrl = require ('../controllers/share.controllers');
const passport = require('passport');


const cors = require('../config/cors');

router.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
router.get('/:id',
  cors.cors,
  shareCntrl.getShare
);
router.post ('/post/:postId',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}), 
  shareCntrl.createShare
);


module.exports = router;