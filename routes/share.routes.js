const express = require('express');
const router = express.Router();
const shareCntrl = require ('../controllers/share.controllers');
const passport = require('passport');

router.get('/:id',shareCntrl.getShare);
router.post ('/post/:postId',passport.authenticate("jwt",{session:false}), shareCntrl.createShare);


module.exports = router;