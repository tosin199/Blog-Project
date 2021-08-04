const express = require('express');
const router = express.Router();
const categoryCntrl = require ('../controllers/category.controllers');
const passport = require('passport');


const cors = require('../config/cors');

router.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
router.get ('/', 
  cors.cors,
  categoryCntrl.getCategory
);
router.post ('/create',
  cors.corsWithOptions,
  passport.authenticate('jwt',{session:false}),
  categoryCntrl.createCategory
);
router.put ('/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}), 
  categoryCntrl.updateCategory
);
router.delete ('/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}), 
  categoryCntrl.deleteCategory
);

module.exports = router;
