const express = require('express');
var router = express.Router();
const controller = require('../controllers/subscriptions.controller');
const passport = require('passport')

router.get('/', controller.getSub);
router.post('/:id',passport.authenticate("jwt",{session:false}), controller.createSubs);
router.delete('/:id',controller.deleteSubs);


module.exports = router;