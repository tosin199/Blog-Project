const express = require('express');
const router = express.Router();
const shareCntrl = require ('../controllers/share.controllers');

router.get ('/', shareCntrl.getShare);
// router.get('/:id',shareCntrl.getOneShare);
router.post ('/user/:userId/post/:postId', shareCntrl.createShare);


module.exports = router;