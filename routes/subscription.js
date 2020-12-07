const express = require('express');
var router = express.Router();
const controller = require('../controllers/subscriptions.controller');
const passport = require('passport')

router.get('/',passport.authenticate("jwt",{session:false}), controller.getSub);
router.post('/:id',passport.authenticate("jwt",{session:false}), controller.createSubs);
router.delete('/:id',passport.authenticate("jwt",{session:false}),controller.deleteSubs);


module.exports = router;