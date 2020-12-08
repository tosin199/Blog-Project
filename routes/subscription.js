const express = require('express');
var router = express.Router();
const controller = require('../controllers/subscriptions.controller');
const passport = require('passport')

router.get('/',passport.authenticate("jwt",{session:false}), controller.getSubscribers);
router.post('/:id',passport.authenticate("jwt",{session:false}), controller.createSubs);
router.post('/addcategory/:id',passport.authenticate('jwt',{session:false}),controller.createCategorySub);
router.put('/updateCategory/subId/:id',passport.authenticate('jwt',{session:true}),controller.updateCategorySub)
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),controller.unsubscribe)
router.delete('/:id',passport.authenticate("jwt",{session:false}),controller.deleteSubs);


module.exports = router;