const express = require('express');
const router = express.Router();
const categoryCntrl = require ('../controllers/category.controllers');
const passport = require('passport');

router.get ('/',passport.authenticate('jwt',{session:false}), categoryCntrl.getCategory);
router.post ('/create',passport.authenticate('jwt',{session:false}),  categoryCntrl.createCategory);
router.put ('/:id',passport.authenticate("jwt",{session:false}), categoryCntrl.updateCategory);
router.delete ('/:id',passport.authenticate("jwt",{session:false}), categoryCntrl.deleteCategory);

module.exports = router;
