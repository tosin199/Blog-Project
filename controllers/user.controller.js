const models = require('../models/index');
const bcrypt = require('bcrypt');
const JwtStartegy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const multer = require('multer');
const helpers = require('../config/helper')
const multerConfig = require('../config/multer');
require('dotenv').config()
const nodemailer = require('nodemailer');

async function  getUser(req,res){
  const user = await models.user.findOne({where:{id:req.user.id},attributes:['firstname','lastname','profilePicture']})
  res.json(user)
}


async function register(req,res){
  var data = req.body;
  if(data.password === data.comfirmPassword){
    const saltRounds = 10 
    const salt = bcrypt.genSaltSync(saltRounds);

    const hash = bcrypt.hashSync(data.password, salt);
    
    data.password = hash
    var msg;
    const checkUser = await models.user.findOne(
      {
        where:{
        email:data.email
        }
      }
      );
    if (checkUser){
      msg = "Sorry you already have an account"
    } else {
      const user = await models.user.create(
        {
          firstname:data.firstname, 
          lastname:data.lastname,
          email:data.email,
          password:data.password
        }
      );
      msg = "Account successfully created"
    
    }
    res.json(msg);
  } else{
    res.json('password did not match');
  }
  
}

async function login(req,res){ 
  const data = req.body;
  const email = data.email;
  const password = data.password;
  var date;
  const user = await models.user.findOne(
    {where:{email:email}}//attributes:['firstname','lastname']
    );
  if (user){
    const checkPassword =  bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.json('Incorrect passsword')
    } else {
      if (data.remember){
        date = 31622400; 
      } else {
        date = 172800 ; //
      }
      const jwt_payload = {
        id:user.id,
      }
      console.log(jwt_payload.id);
      const deleteLog =  await models.isLoggedOut.destroy({where:{userId:user.id}}) 
      const token = jwt.sign(jwt_payload,process.env.SECRET,{expiresIn:date});
      return res.json(
        { "token":token,
          "data":user,
          "statusCode":200
        }
        )
    }
  } else {
    return res.json('No account found ')
  }
};
async function logout(req,res){
  await models.isLoggedOut.create({userId:req.user.id,status:true});
  res.json("logged out");
}

async function updateUser(req,res){
  var data = req.body;
  const user = await models.user.update({firstname:data.firstname, lastname:data.lastname,email:data.email, password:data.password},{where:{id:req.user.id}});
  res.json({msg:'User updated successfully'})

} 

async function deleteUser(req,res){
  const user = await models.user.destroy({where:{id:req.user.id}});
  res.json({msg:'user deleted'})

}


async function uploadProfilePicture(req,res){

  multerConfig.singleUpload(req, res, async function(err) {

  if (err instanceof multer.MulterError) {
      return res.json(err.message);
  } 
  else if (err) {
    return res.json(err);
  } 
  else if (!req.file) {
    return res.json({"image": req.file, "msg":'Please select an image to upload'});
  }
  if(req.file){
    await models.user.update({profilePicture:req.file.path}, {where:{id:req.user.id}});
    return  res.json({'msg': 'uploaded', 'file':req.file});
  } 

});
}

async function getUserProfilePicture(req,res){
  const picture = await  models.user.findOne({where:{id:req.user.id} ,attributes:['profilePicture']});//{attributes:['profilePicture']}
  res.json(picture);
}


async function createAdmin(req,res){
  const user = await models.user.findOne({where:{id:req.user.id}})
  if (user){
    const admin = await models.user.update({isAdmin:true},{where:{id:req.user.id}})
    res.json('Admin created')
  }
}
async function sendCode(req,res){
  data = req.body;
  const email = data.email;
  const User = await models.user.findOne({where:{email:email}})
  if (User){
    let value,val;
    value = Math.floor(1000 + Math.random() * 9000);
    val = value.toString();

    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
      if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          return process.exit(1);
      }

      console.log('Credentials obtained, sending message...');

      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
              user: account.user,
              pass: account.pass
          }
      });

      // Message object
      let message = {
          from: '24/7 News <CodeVerification@24/7.com>',
          to: email,
          subject: 'Password Reset Code ✔',
          text: val,
          // html: '<p><b>Hello</b> to myself!</p>'
      };

      transporter.sendMail(message, (err, info) => {
          if (err) {
              console.log('Error occurred. ' + err.message);
              return process.exit(1);
          }

          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    });
    await models.resetPasswordCode.create({code:val,userId:User.id});
    res.json({'msg':'code sent'});
  }else{res.json({'msg':'No account with this email'})}

}
async function resetPassword(req,res){
  data = req.body;
  const codes = await models.resetPasswordCode.findOne({where:{code:data.code}});
  if(codes){
      if(data.newPassword === data.comfirmPassword){
        const saltRounds = 10 
        const salt = bcrypt.genSaltSync(saltRounds);

        const hash = bcrypt.hashSync(data.newPassword, salt);
      
        data.newPassword = hash
        await models.user.update({password:data.newPassword},{where:{id:codes.userId}});
        await models.resetPasswordCode.destroy({where:{code:data.code}})
        res.json('password changed')
      }else{res.json('password do not match')}
  }else{res.json('incorrect pin')}
}

async function changePassword(req,res){
  data = req.body;
  const User = await models.user.findOne({where:{id:req.user.id}});
  const checkPassword =  bcrypt.compareSync(data.password, User.password);
  if(checkPassword){
    if(data.newPassword === data.comfirmPassword){
      const saltRounds = 10 
      const salt = bcrypt.genSaltSync(saltRounds);

      const hash = bcrypt.hashSync(data.newPassword, salt);
      
      data.newPassword = hash
      await models.user.update({password:data.newPassword},{where:{id:req.user.id}});
      res.json('password changed')
    } else {
       res.json('password do not match')
    }
  } else{
    res.json('incorect password');
  }
  
} 
module.exports = {
  getUser,
  register,
  updateUser,
  deleteUser,
  login,
  logout,
  changePassword,
  sendCode,
  resetPassword,
  uploadProfilePicture,
  getUserProfilePicture,
  createAdmin
}