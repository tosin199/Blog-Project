var express = require('express');
var router = express.Router();
const controller = require('../controllers/user.controller');
const passport = require('passport');



const cors = require('../config/cors');

router.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
router.get('/',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  controller.getUser
);
router.post('/register',
  cors.cors,
   controller.register
  );
router.put('/updateUser',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  controller.updateUser
);
router.delete('/deleteUser',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  controller.deleteUser
);
router.post('/login',
  cors.cors,
  controller.login
);
router.post('/logout',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  controller.logout
);
router.post('/uploadProfilePicture',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  controller.uploadProfilePicture
);
router.post('/changePassword',
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  controller.changePassword
);
router.post('/resetPassword/send',
  cors.cors,
  controller.sendCode
);
router.post('/resetPassword',
  cors.cors,
  controller.resetPassword
);
router.get('/profilePicture', 
  cors.corsWithOptions,
  passport.authenticate("jwt",{session:false}),
  controller.getUserProfilePicture
); 
router.post('/createAdmin',
  cors.corsWithOptions,
  passport.authenticate('jwt',{session:false}),controller.createAdmin
);


module.exports = router;