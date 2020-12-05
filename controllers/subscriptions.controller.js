const models = require('../models/index');

async function getSub(req,res){
  const sub = await models.sub.findAll({include:[models.user]});
  res.json(sub);
};

async function createSubs(req,res){
  const sub = await models.sub.create({userId:req.user.id});
  res.json(sub)
};

async function deleteSubs(req,res){
  const sub = models.sub.destroy({where:{id:req.user.id}});
  res.send('deleted');

};

module.exports = {
  getSub,
  createSubs,
  deleteSubs
};
