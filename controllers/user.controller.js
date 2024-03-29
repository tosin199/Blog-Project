const models = require('../models/index');
const bcrypt = require('bcrypt');
const JwtStartegy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const multer = require('multer');
const helpers = require('../config/helper')
const multerConfig = require('../config/multer');
const methods = require('../helpers/method');
require('dotenv').config()


async function  getUser(req,res){
  const user = await models.user.findOne(
    {
      where:{id:req.user.id},
      attributes:['firstname','lastname','bio','profilePicture',"email",
      "profilePicture","isVerified"]
    }
  );
  return res.json({status:'success',data:user})
}


async function register(req,res){
  var data = req.body;
  if(data.password === data.confirmPassword){
    const saltRounds = 10 
    const salt = bcrypt.genSaltSync(saltRounds);

    const hash = bcrypt.hashSync(data.password, salt);
    
    data.password = hash
    var message;
    const checkUser = await models.user.findOne(
      {
        where:{
        email:data.email
        }
      }
      );
    if (checkUser){
      message = 'Sorry you already have an account'
    } else {
      const user = await models.user.create(
        {
          firstname:data.firstname, 
          lastname:data.lastname,
          email:data.email,
          password:data.password
        }
      );
      message = 'Account successfully created'
      const name = user.firstname+' '+user.lastname
      const email = user.email
      let val = methods.generateCode();
      methods.sendAccountVerificationCode(email,name,val);
      await models.otpCode.create({
        code:val,
        userId:user.id
      })
    }
    return res.json({status:'success','message':message});
  } else{
    return res.json({status:'success','message':'password do not match'});
  }
  
}
async function verifyAccount(req,res){
  const data = req.body;
  const response ={
      'status':'true',
      'message':'success',
      'data':null
  }
  const user = await models.otpCode.findOne(
    {
      where:{code:data.code}
    }
  );
  if(user){
    const update = await models.user.update(
      {
        isVerified:true
      },
      {
        where:{id:user.userId}
      }
    )
    await models.otpCode.destroy(
      {
       where:{id:user.id}
      }
   );
   return res.json({'message':'account verified','status':'success'})
  }

  return res.json({'message':'incorrect pin','status':'success'})
}
async function login(req,res){ 
  const data = req.body;
  const email = data.email;
  const password = data.password;
  var date;
  const user = await models.user.findOne(
    {
      where:{email:email},
      attributes:["id","firstname",
      "lastname",
      "email",
      "profilePicture",
      "password"
      ]
    }
    );
  if (user){
    const checkPassword =  bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.json('Incorrect passsword')
    } else {
      if (data.remember){
        date = 31622400; 
      } else {
        date = 172800 ; //3600
      }
      const jwt_payload = {
        id:user.id,
      }
       await models.isLoggedOut.destroy({where:{userId:user.id}}) 
      const token = jwt.sign(jwt_payload,process.env.SECRET,{expiresIn:date});
      return res.json(
        { 'token':token,
          'data':user,
          'statusCode':200
        }
        )
    }
  } else {
    return res.json({status:'success','message':'No account found '})
  }
};
async function logout(req,res){
  await models.isLoggedOut.create(
    {
      userId:req.user.id,status:true
    }
  );
  return res.json({status:'success','message':'logged out'});
}

async function updateUser(req,res){
  var data = req.body;
  const user = await models.user.update(
    {
      firstname:data.firstname,
      lastname:data.lastname,bio:data.bio
    },
    {
      where:{id:req.user.id}
    }
  );
  return res.json({status:'success',message:'User updated successfully'})

} 

async function deleteUser(req,res){
  const user = await models.user.destroy(
    {
      where:{id:req.user.id}
    }
  );
  return res.json({status:'true',message:'user deleted'})

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
    return res.json({status:'true','image': req.file, 'message':'Please select an image to upload'});
  }
  if(req.file){
    await models.user.update({profilePicture:req.file.path}, {where:{id:req.user.id}});
    return  res.json({status:'true',message: 'uploaded', 'file':req.file});
  } 

});
}

async function getUserProfilePicture(req,res){
  const picture = await  models.user.findOne(
    {
      where:{id:req.user.id} ,attributes:['profilePicture']
    }
  );//{attributes:['profilePicture']}
  return res.json({'status':'success','data':picture});
}


async function createAdmin(req,res){
  const user = await models.user.findOne(
    {
      where:{id:req.user.id}
    }
  )
  if (user){
    const admin = await models.user.update(
      {
        isAdmin:true
      },
      {
        where:{id:req.user.id}
      }
    )
    return res.json({'status':'succcess','message':'Admin created'})
  }
}
async function sendCode(req,res){
  data = req.body;
  const email = data.email;
  const User = await models.user.findOne(
    {
      where:{email:email}
    }
  )
  if (User){
    const name = User.firstname+' '+User.lastname
    let val = helpers.generateCode();
    helpers.AccountResetCode(email,name,val);

    await models.otpCode.create(
      {
        code:val,userId:User.id
      }
    );
    res.json({'message':'code sent'});
    
  }else{res.json({'status':'success','message':'No account with this email'})}

}
async function resetPassword(req,res){
  data = req.body;
  const codes = await models.otpCode.findOne(
    {
      where:{code:data.code}
    }
  );
  if(codes){
    if(data.newPassword === data.confirmPassword){
      const saltRounds = 10 
      const salt = bcrypt.genSaltSync(saltRounds);

      const hash = bcrypt.hashSync(data.newPassword, salt);
      
      data.newPassword = hash
      await models.user.update(
        {
          password:data.newPassword
        },
        {
          where:{id:codes.userId}
        }
      );
      await models.otpCode.destroy(
        {
          where:{code:data.code}
        }
      )
      return res.json({'status':'success','message':'password changed'})
    }else{
      return res.json({'status':'error','message':'password did not match'})
    }
  }else{
    return res.json({'status':'success','message':'incorrect pin'})
  }
}

async function changePassword(req,res){
  data = req.body;
  const User = await models.user.findOne(
    {
      where:{id:req.user.id}
    }
  );
  const checkPassword =  bcrypt.compareSync(data.password, User.password);
  if(checkPassword){
    if(data.newPassword === data.confirmPassword){
      const saltRounds = 10 
      const salt = bcrypt.genSaltSync(saltRounds);

      const hash = bcrypt.hashSync(data.newPassword, salt);
      
      data.newPassword = hash
      await models.user.update(
        {
          password:data.newPassword
        },
        {
          where:{id:req.user.id}
        }
      );
      return res.json({'status':'success','message':'password changed'})
    } else {
      return res.json({'status':'success','message':'password did not match'})
    }
  } else{
    return res.json({'status':'success','message':'incorrect password'});
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
  createAdmin,
  verifyAccount
}