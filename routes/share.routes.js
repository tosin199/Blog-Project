const express = require('express');
const router = express.Router();
const shareCntrl = require ('../controllers/share.controllers');

router.get ('/', shareCntrl.getShare);
router.post ('/create', shareCntrl.createShare);


module.exports = router;