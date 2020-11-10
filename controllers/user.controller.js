const models = require('../models/index');

async function  getUser(req,res){
  userId = req.params.id;
  const user = await models.user.findAll({where:{id:userId}})
  res.json(user);

}

async function createUser(req,res){
  var data = req.body;
  const user = await models.user.create({firstname:data.firstname, lastname:data.firstname,email:data.email, password:data.password});
  res.json(user);

}

async function deleteUser(req,res){
  userId = req.params.id;
  const user = await models.user.destroy({where:{id:req.params.id}});
  res.json({mssg:'user deleted'})

}

module.exports = {
  getUser,
  createUser,
  deleteUser
}