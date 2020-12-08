const models = require('../models/index');
const bcrypt = require('bcrypt');
const JwtStartegy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const multer = require('multer');
const helpers = require('../config/helper')
const multerConfig = require('../config/multer')

async function  getUser(req,res){
  const user = await models.user.findOne({where:{id:req.user.id},attributes:['firstname','lastname','profilePicture']})
  res.json(user)
}


async function register(req,res){
  var data = req.body;
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
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.json('Incorrect passsword')
    } else {
      if (data.remember){
          date = 31622400; 
      } else {
         date = 172800;
      }
      const jwt_payload = {
        id:user.id,
      }
      const token = jwt.sign(jwt_payload,"mySecret");
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
  const jwt_payload = {
    id:req.user.id,
  }
  const token = jwt.sign(jwt_payload,"null");
  res.json("logged out")
}

async function updateUser(req,res){
  var data = req.body;
  const user = await models.user.update({firstname:data.firstname, lastname:data.lastname,email:data.email, password:data.password},{where:{id:req.user.id}});
  res.json({msg:'User updated successfully'})

}
  

async function deleteUser(req,res){
  const user = await models.user.destroy({where:{id:req.user.id}});
  res.json({mssg:'user deleted'})

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
    console.log("usee>>>>>>>",req.user);
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

module.exports = {
  getUser,
  register,
  updateUser,
  deleteUser,
  login,
  logout,
  uploadProfilePicture,
  getUserProfilePicture,
  createAdmin
}