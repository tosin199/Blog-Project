const express = require('express');
var router = express.Router();
const controller = require('../controllers/subscriptions.controller');
const passport = require('passport')


const cors = require('../config/cors');

router.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
router.get('/',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false})
  , controller.getSubscribers
);
router.post('/',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}), 
  controller.createSubs
);
router.post('/addCategory',
  cors.corsWithOptions,
  passport.authenticate('jwt',{session:false}),
  controller.createCategorySub
);
router.put('/updateCategory/subId/:id',
  cors.corsWithOptions,
  passport.authenticate('jwt',{session:true}),
  controller.updateCategorySub
);
router.delete('/delete/:id',
  cors.corsWithOptions,
  passport.authenticate('jwt',{session:false}),
  controller.unsubscribe
);
router.delete('/:id',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  controller.deleteSubs
);


module.exports = router;