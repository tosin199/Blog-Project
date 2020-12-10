var express = require('express');
var router = express.Router();
const controller = require('../controllers/user.controller');
const passport = require('passport');


router.get('/', passport.authenticate("jwt",{session:false}),  controller.getUser);
router.post('/register', controller.register);
router.put('/updateUser', passport.authenticate("jwt",{session:false}), controller.updateUser);
router.delete('/deleteUser',passport.authenticate("jwt",{session:false}), controller.deleteUser);
router.post('/login', controller.login);
router.post('/logout',passport.authenticate("jwt",{session:false}), controller.logout);
router.post('/uploadProfilePicture',passport.authenticate("jwt",{session:false}), controller.uploadProfilePicture);
router.post('/changePassword',passport.authenticate("jwt",{session:false}), controller.changePassword);
router.post('/resetPassword/send', controller.sendCode);
router.post('/resetPassword',controller.resetPassword);
router.get('/profilePicture', passport.authenticate("jwt",{session:false}), controller.getUserProfilePicture); 
router.post('/createAdmin',passport.authenticate('jwt',{session:false}),controller.createAdmin)


module.exports = router;